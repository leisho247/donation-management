import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CategoriasDonacionesModule } from './modules/categorias-donaciones/categorias_donaciones.module';

@Module({
  imports: [
    AuthModule, 
    UsuariosModule, 
    CategoriasDonacionesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
