import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan Pérez' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  nombre: string;

  @ApiProperty({ description: 'Email del usuario', example: 'nuevo.usuario@example.com' })
  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', example: 'ContrasenaFuerte123' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  contrasenaHash: string; 
}
