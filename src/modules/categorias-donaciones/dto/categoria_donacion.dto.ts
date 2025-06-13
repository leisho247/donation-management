import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator'; 
import { BaseCategoriaDonacionDto } from './base_categoria_donacion.dto';

export class CategoriaDonacionDto extends BaseCategoriaDonacionDto {
  @ApiProperty({ description: 'Identificador único de la categoría de donación', example: 1 })
  @IsNumber()
  id: number;
}