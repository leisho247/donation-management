import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<any> {
    return await this.prismaService.usuario.create({
      data: createUsuarioDto,
    });
  }

  async findAll(): Promise<any> {
    return await this.prismaService.usuario.findMany({
      include: {
        usuariosDonaciones: true,
        visitasLugaresDonacion: true,
      },
    });
  }

  async findOne(id: number): Promise<any> {
    return await this.prismaService.usuario.findUnique({
      where: { id },
      include: {
        usuariosDonaciones: true,
        visitasLugaresDonacion: true,
      },
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<any> {
    return await this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: number): Promise<any> {
    return await this.prismaService.usuario.delete({
      where: { id },
    });
  }
}
