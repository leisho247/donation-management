import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpCode,
  HttpStatus, 
} from '@nestjs/common';
import { CategoriasDonacionesService } from './categorias_donaciones.service';
import { CrearCategoriaDonacionDto } from './dto/crear_categoria_donacion.dto';
import { ActualizarCategoriaDonacionDto } from './dto/actualizar_categoria_donacion.dto';
import { CategoriaDonacionDto } from './dto/categoria_donacion.dto';
import { CategoriaDonacion } from '@prisma/client';
import { ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiTags, ApiNoContentResponse } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categorias-donaciones')
export class CategoriasDonacionesController {
  constructor(private readonly categoriasDonacionesService: CategoriasDonacionesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'La categoría ha sido creada exitosamente.', type: CategoriaDonacionDto })
  async createCategoria(@Body() createCategoriaDto: CrearCategoriaDonacionDto): Promise<CategoriaDonacion> {
    return await this.categoriasDonacionesService.createCategory(createCategoriaDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de todas las categorías de donaciones.', type: [CategoriaDonacionDto] })
  async findAll(): Promise<CategoriaDonacion[]> {
    return await this.categoriasDonacionesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Categoría de donación encontrada.', type: CategoriaDonacionDto })
  @ApiNotFoundResponse({ description: 'Categoría de donación no encontrada.' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<CategoriaDonacion> {
    const categoria = await this.categoriasDonacionesService.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoría de donación con ID ${id} no encontrada.`);
    }
    return categoria;
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'La categoría ha sido actualizada exitosamente.', type: CategoriaDonacionDto })
  @ApiNotFoundResponse({ description: 'Categoría de donación no encontrada.' })
  async updateCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: ActualizarCategoriaDonacionDto,
  ): Promise<CategoriaDonacion> {
    return await this.categoriasDonacionesService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'La categoría ha sido eliminada exitosamente.' }) 
  @ApiNotFoundResponse({ description: 'Categoría de donación no encontrada.' })
  async deleteCategoria(@Param('id', ParseIntPipe) id: number): Promise<void> { 
    await this.categoriasDonacionesService.delete(id);
  }
}