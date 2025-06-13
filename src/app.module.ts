import { Module } from '@nestjs/common';
import { jwtConfig } from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CategoriasDonacionesModule } from './modules/categorias-donaciones/categorias_donaciones.module';

@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig()), UsuariosModule, CategoriasDonacionesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
