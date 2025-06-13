import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CrearCategoriaDonacionDto } from './dto/crear_categoria_donacion.dto'; 
import { ActualizarCategoriaDonacionDto } from './dto/actualizar_categoria_donacion.dto';
import { CategoriaDonacion } from '@prisma/client';

@Injectable()
export class CategoriasDonacionesService { 
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(createCategoriaDto: CrearCategoriaDonacionDto): Promise<CategoriaDonacion> {
    return this.prismaService.categoriaDonacion.create({
      data: createCategoriaDto
    });
  }

  async findAll(): Promise<CategoriaDonacion[]> {
    return this.prismaService.categoriaDonacion.findMany({
    });
  }

  async findOne(id: number): Promise<CategoriaDonacion | null> {
    return this.prismaService.categoriaDonacion.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateCategoriaDto: ActualizarCategoriaDonacionDto): Promise<CategoriaDonacion> {
    return this.prismaService.categoriaDonacion.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  async delete(id: number): Promise<CategoriaDonacion> {
    return this.prismaService.categoriaDonacion.delete({
      where: { id },
    });
  }
}