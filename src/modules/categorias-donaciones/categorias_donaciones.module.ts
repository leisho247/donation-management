import { Module } from '@nestjs/common';
import { CategoriasDonacionesService } from './categorias_donaciones.service'; 
import { CategoriasDonacionesController } from './categorias_donaciones.controller'; 
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriasDonacionesController],
  providers: [CategoriasDonacionesService, PrismaService],
  exports: [CategoriasDonacionesService], 
})
export class CategoriasDonacionesModule {} 