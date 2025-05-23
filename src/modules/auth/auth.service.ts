import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserCreateDto } from './dto/register-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new Error('The user with this email already exists');
      }
    }
  }
  async login(loginRequestDto: LoginRequestDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: loginRequestDto.email },
    });

    const validatePassword = await bcrypt.compare(
      loginRequestDto.contrasenaHash,
      user.contrasenaHash,
    );
    if (!validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        name: user.nombre,
        email: user.email,
      },
      token,
    };
  }
}
