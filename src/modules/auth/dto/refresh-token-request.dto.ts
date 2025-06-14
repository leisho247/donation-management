import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty({ description: 'El refresh token para obtener nuevos tokens de acceso.', example: 'eyJhbGciOiJIUzI1Ni...' })
  @IsString({ message: 'El refresh token debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El refresh token no puede estar vacío.' })
  refreshToken: string;
}