import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'; 

export class BaseCategoriaDonacionDto {
  @ApiProperty({ description: 'Nombre de la categoría de donación', example: 'Ropa' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  nombre: string;
}

