import { Controller, Body, Post, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserCreateDto } from './dto/register-request.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto'; // <-- IMPORTA EL NUEVO DTO
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'; 

@ApiTags('Auth') 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED) 
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.', type: Object }) 
  @ApiResponse({ status: 409, description: 'El usuario con este email ya existe.' })
  async register(@Body() userCreateDto: UserCreateDto) {
    return await this.authService.register(userCreateDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) 
  @ApiOperation({ summary: 'Iniciar sesión de usuario y obtener tokens' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.', type: Object })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refrescar el Access Token usando un Refresh Token' })
  @ApiResponse({ status: 200, description: 'Access token refrescado exitosamente.', type: Object })
  @ApiResponse({ status: 400, description: 'Refresh token es requerido.' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido o expirado.' })
  async refresh(@Body() refreshTokenDto: RefreshTokenRequestDto) { 
    return await this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
