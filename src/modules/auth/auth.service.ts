import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserCreateDto } from './dto/register-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConfig } from 'src/config/jwt.config';

interface JwtPayload {
  id: number;
  email: string;
}

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_SECRET: string | Buffer;
  private readonly REFRESH_TOKEN_SECRET: string | Buffer;
  private readonly ACCESS_TOKEN_EXPIRATION: string;
  private readonly REFRESH_TOKEN_EXPIRATION: string;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    const config = jwtConfig();
    this.ACCESS_TOKEN_SECRET = config.accessToken.secret!;
    this.REFRESH_TOKEN_SECRET = config.refreshToken.secret!;
    this.ACCESS_TOKEN_EXPIRATION = config.accessToken.signOptions.expiresIn as string;
    this.REFRESH_TOKEN_EXPIRATION = config.refreshToken.signOptions.expiresIn as string;
  }

  private generateAccessToken(user: { id: number; email: string }): string {
    const payload: JwtPayload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      secret: this.ACCESS_TOKEN_SECRET,
      expiresIn: this.ACCESS_TOKEN_EXPIRATION,
    });
  }

  private async generateAndHashRefreshToken(user: { id: number; email: string }): Promise<{ token: string; hashedToken: string }> {
    const payload: JwtPayload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: this.REFRESH_TOKEN_SECRET,
      expiresIn: this.REFRESH_TOKEN_EXPIRATION,
    });
    const hashedToken = await bcrypt.hash(token, 10);
    return { token, hashedToken };
  }

  async register(userCreateDto: UserCreateDto) {
    const hashedPassword = await bcrypt.hash(userCreateDto.contrasenaHash, 10);

    try {
      const newUser = await this.prisma.usuario.create({
        data: {
          nombre: userCreateDto.nombre,
          email: userCreateDto.email,
          contrasenaHash: hashedPassword,
        },
      });

      const { token: refreshToken, hashedToken: refreshTokenHash } = await this.generateAndHashRefreshToken({
        id: newUser.id,
        email: newUser.email,
      });

      await this.prisma.usuario.update({
        where: { id: newUser.id },
        data: { refreshTokenHash: refreshTokenHash },
      });

      const accessToken = this.generateAccessToken(newUser);

      return {
        user: {
          id: newUser.id,
          name: newUser.nombre,
          email: newUser.email,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginRequestDto: LoginRequestDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: loginRequestDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequestDto.contrasenaHash,
      user.contrasenaHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const accessToken = this.generateAccessToken(user);
    const {
      token: newRefreshToken,
      hashedToken: newRefreshTokenHash
    } = await this.generateAndHashRefreshToken(user);

    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { refreshTokenHash: newRefreshTokenHash },
    });

    return {
      user: {
        id: user.id,
        name: user.nombre,
        email: user.email,
      },
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token es requerido.');
    }

    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.REFRESH_TOKEN_SECRET,
      }) as JwtPayload;

      const user = await this.prisma.usuario.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado o token inválido.');
      }

      if (!user.refreshTokenHash || !(await bcrypt.compare(refreshToken, user.refreshTokenHash))) {
        throw new UnauthorizedException('Refresh token inválido o expirado.');
      }

      const newAccessToken = this.generateAccessToken(user);

      const { token: rotatedRefreshToken, hashedToken: rotatedRefreshTokenHash } = await this.generateAndHashRefreshToken(user);
      await this.prisma.usuario.update({
        where: { id: user.id },
        data: { refreshTokenHash: rotatedRefreshTokenHash },
      });

      return {
        accessToken: newAccessToken,
        refreshToken: rotatedRefreshToken,
        message: 'Access token actualizado correctamente.',
      };
    } catch (error: any) {
        throw error;
    }
  }
}
