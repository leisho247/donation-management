import { Module } from '@nestjs/common';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig()), UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
