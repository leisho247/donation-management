import { ApiProperty} from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
  IsMobilePhone,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan', required: false })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' }) 
  @MaxLength(255, { message: 'El nombre no puede exceder los 255 caracteres.' })
  nombre?: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez', required: false })
  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'El apellido no puede exceder los 255 caracteres.' })
  apellido?: string;

  @ApiProperty({ description: 'Fecha de nacimiento del usuario (YYYY-MM-DD)', example: '1990-05-15', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD).' })
  fechaNacimiento?: Date;

  @ApiProperty({ description: 'DNI del usuario', example: '12345678', required: false })
  @IsOptional()
  @IsString({ message: 'El DNI debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'El DNI no puede exceder los 20 caracteres.' })
  dni?: string;

  @ApiProperty({ description: 'Nacionalidad del usuario', example: 'Argentina', required: false })
  @IsOptional()
  @IsString({ message: 'La nacionalidad debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'La nacionalidad no puede exceder los 100 caracteres.' })
  nacionalidad?: string;

  @ApiProperty({ description: 'Dirección del usuario', example: 'Calle Falsa 123', required: false })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MaxLength(255, { message: 'La dirección no puede exceder los 255 caracteres.' })
  direccion?: string;

  @ApiProperty({ description: 'Número de la dirección', example: '123', required: false })
  @IsOptional()
  @IsString({ message: 'El número de dirección debe ser una cadena de texto.' })
  @MaxLength(10, { message: 'El número de dirección no puede exceder los 10 caracteres.' })
  numeroDireccion?: string;

  @ApiProperty({ description: 'Número de celular del usuario', example: '+5491112345678', required: false })
  @IsOptional()
  @IsString({ message: 'El celular debe ser una cadena de texto.' })
  @MaxLength(20, { message: 'El celular no puede exceder los 20 caracteres.' })
  celular?: string;

  @ApiProperty({ description: 'Código postal del usuario', example: 'B1824', required: false })
  @IsOptional()
  @IsString({ message: 'El código postal debe ser una cadena de texto.' })
  @MaxLength(10, { message: 'El código postal no puede exceder los 10 caracteres.' })
  codigoPostal?: string;

  @ApiProperty({ description: 'Email del usuario (único)', example: 'usuario@example.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' }) 
  @MaxLength(255, { message: 'El email no puede exceder los 255 caracteres.' })
  email?: string;

  @ApiProperty({ description: 'Nueva contraseña del usuario (texto plano, se hashea en el backend)', example: 'NuevaContrasenaSegura' , required: false})
  @IsOptional()
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @MaxLength(255, { message: 'La contraseña no puede exceder los 255 caracteres.' })
  contrasenaHash?: string; 

  @ApiProperty({ description: 'Provincia del usuario', example: 'Buenos Aires', required: false })
  @IsOptional()
  @IsString({ message: 'La provincia debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'La provincia no puede exceder los 100 caracteres.' })
  provincia?: string;

  @ApiProperty({ description: 'Localidad del usuario', example: 'Lanús', required: false })
  @IsOptional()
  @IsString({ message: 'La localidad debe ser una cadena de texto.' })
  @MaxLength(100, { message: 'La localidad no puede exceder los 100 caracteres.' })
  localidad?: string;

  @ApiProperty({ description: 'Estado activo del usuario', example: true, required: false })
  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser un valor booleano.' })
  estado?: boolean; 
}
