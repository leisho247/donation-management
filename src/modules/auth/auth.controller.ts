import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserCreateDto } from './dto/register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() userCreateDto: UserCreateDto) {
    return await this.authService.register(userCreateDto);
  }

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }
}
