import { PartialType } from '@nestjs/mapped-types';
import { BaseCategoriaDonacionDto } from './base_categoria_donacion.dto'; // <-- Importa el DTO base

export class ActualizarCategoriaDonacionDto extends PartialType(BaseCategoriaDonacionDto) {
}