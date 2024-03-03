import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CharactersService {
  constructor(private prisma: PrismaService) {}

  async create(createCharacterDto: CreateCharacterDto, req: any, file: any) {
    const createCharacter = await this.prisma.character.create({
      data: {
        roleAs: createCharacterDto.roleAs,
        name: createCharacterDto.name,
        workId: createCharacterDto.workId,
        picture: file.filename,
      },
    });

    if (!createCharacter) {
      throw new InternalServerErrorException();
    }
    return {
      statusCode: 200,
      data: createCharacter,
    };
  }

  async findAll() {
    return await this.prisma.character.findMany({ include: { work: true } });
  }

  async findOne(id: number) {
    return await this.prisma.character.findFirst({ where: { id } });
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto, file: any) {
    const data = {
      roleAs: updateCharacterDto?.roleAs,
      name: updateCharacterDto?.name,
      workId: updateCharacterDto?.workId,
      picture: file?.filename,
    };
    const updateCharacter = await this.prisma.character.update({
      where: { id },
      data,
    });
    return {
      statusCode: 200,
      data: updateCharacter,
    };
  }

  async remove(id: number) {
    if (id) {
      await this.prisma.userDonate.deleteMany({ where: { characterId: id } });
    }
    return await this.prisma.character.delete({ where: { id } });
  }
}
