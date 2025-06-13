import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
} from '@prisma/client/runtime/library';

const DEFAULT_ERROR_STATUS = HttpStatus.INTERNAL_SERVER_ERROR;
const DEFAULT_ERROR_MESSAGE = 'Internal Server Error';
const UNKNOWN_ERROR_NAME = 'UnknownError';

interface ErrorResponse {
  statusCode: number;
  name: string;
  timestamp: string;
  path: string;
  message: string | string[];
  stack?: string;
}

interface PrismaErrorConfig {
  status: HttpStatus;
  message: (error: PrismaClientKnownRequestError) => string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  private prismaErrorMap: Map<string, PrismaErrorConfig>;
  private prismaDefaultErrorConfig: PrismaErrorConfig;

  constructor() {
    this.prismaDefaultErrorConfig = {
      status: HttpStatus.BAD_REQUEST, 
      message: (error: PrismaClientKnownRequestError) => `Error en la base de datos: ${error.message}`,
    };
    this.initializePrismaErrorMap();
  }

  private initializePrismaErrorMap() {
    this.prismaErrorMap = new Map<string, PrismaErrorConfig>();

    this.prismaErrorMap.set('P2002', {
      status: HttpStatus.CONFLICT, 
      message: (error: PrismaClientKnownRequestError) => {
        const fieldName = (error.meta?.target as string[])?.[0] || 'campo';
        return `Ya existe una categoría de donación con ese ${fieldName}. Por favor, elige un ${fieldName} diferente.`;
      },
    });

    this.prismaErrorMap.set('P2025', {
      status: HttpStatus.NOT_FOUND, 
      message: () => 'Registro no encontrado.',
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus = DEFAULT_ERROR_STATUS;
    let message: string | string[] = DEFAULT_ERROR_MESSAGE;
    let name: string = UNKNOWN_ERROR_NAME;
    let stack: string | undefined = undefined;

    if (exception instanceof PrismaClientInitializationError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Database connection error';
      name = exception.name;
      stack = exception.stack;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      const errorConfig = this.prismaErrorMap.get(exception.code) || this.prismaDefaultErrorConfig;
      status = errorConfig.status;
      message = errorConfig.message(exception); 
      name = exception.name;
      stack = exception.stack;
    } else if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      message = `Validation error: ${exception.message}`;
      name = exception.name;
      stack = exception.stack;
    }
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = (typeof res === 'object' && res !== null && 'message' in res)
        ? (res as any).message
        : (typeof res === 'string' ? res : DEFAULT_ERROR_MESSAGE);

      this.logger.debug(`[HttpException] Raw response from pipe: ${JSON.stringify(res)}`);
      name = exception.name;
      stack = exception.stack;
    }
    else if (exception instanceof Error && exception.message?.toLowerCase().includes('cloudinary')) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = `Error al subir archivos a Cloudinary: ${exception.message}`;
      name = exception.name;
      stack = exception.stack;
    }
    else if (exception instanceof Error) {
      status = DEFAULT_ERROR_STATUS;
      message = exception.message;
      name = exception.name;
      stack = exception.stack;
    }
    else {
      message = typeof exception === 'string' ? exception : DEFAULT_ERROR_MESSAGE;
      name = UNKNOWN_ERROR_NAME;
      stack = undefined;
    }

    const finalMessage = Array.isArray(message) ? message : [String(message)];

    this.logger.error(
      `[${status}] ${request.method} ${request.url} - ${finalMessage.join(', ')}`,
      JSON.stringify({
        user: (request as any)?.id || 'Unknown user',
        body: request.body,
        stack,
      }),
    );

    response.status(status).json({
      statusCode: status,
      name,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: finalMessage,
    } as ErrorResponse);
  }
}
