import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkDto: CreateWorkDto, req: any, file: any) {
    console.log(file);
    const createWork = await this.prisma.work.create({
      data: {
        userId: req.id,
        title: createWorkDto.title,
        picture: file.filename,
        tagline: createWorkDto.tagline,
        type: createWorkDto.type,
        category: createWorkDto.category,
        intro: createWorkDto.intro,
        status: createWorkDto.status,
      },
    });
    return {
      status: 200,
      data: createWork,
    };
  }

  async findAll() {
    return await this.prisma.work.findMany();
  }

  async findAllByUser(userId: any) {
    return await this.prisma.work.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    return await this.prisma.work.findFirst({
      where: { id },
      include: { characters: true, user: true },
    });
  }

  async update(id: number, updateWorkDto: UpdateWorkDto, file: any) {
    const data = {
      title: updateWorkDto?.title,
      picture: file?.filename,
      tagline: updateWorkDto?.tagline,
      type: updateWorkDto?.type,
      category: updateWorkDto?.category,
      intro: updateWorkDto?.intro,
      status: updateWorkDto?.status,
    };
    const work = await this.prisma.work.findFirst({ where: { id } });
    const updateWork = await this.prisma.work.update({
      where: { id },
      data,
    });
    return {
      status: 200,
      data: updateWork,
    };
  }

  async remove(id: number) {
    const work = await this.prisma.work.findFirst({
      where: { id },
      include: {
        espisodes: {
          include: {
            pictures: true,
          },
        },
        characters: {
          include: {
            donated: true,
          },
        },
      },
    });
    if (work) {
      if (work.espisodes.length >= 1) {
        work.espisodes.map(async (item) => {
          if (item.pictures) {
            await this.prisma.espisodePicture
              .deleteMany({
                where: { espisodeId: item.id },
              })
              .catch((err) => {
                console.log(err);
              });
          }

          await this.prisma.espisode
            .delete({ where: { id: item.id } })
            .catch((err) => {
              console.log(err);
            });

          return {
            status: 200,
          };
        });
      }

      if (work.characters.length >= 1) {
        work.characters.map(async (item) => {
          if (item.donated) {
            await this.prisma.userDonate
              .deleteMany({
                where: { characterId: item.id },
              })
              .catch((err) => {
                console.log(err);
              });
          }

          return {
            status: 200,
          };
        });

        await this.prisma.character
          .deleteMany({ where: { workId: id } })
          .catch((err) => {
            console.log(err);
          });
      }

      await this.prisma.work.delete({ where: { id } });
    } else {
      return {
        status: 404,
        massage: `Not Found Work ID: ${id}`,
      };
    }
    return {
      status: 200,
      massage: 'Success',
    };
  }
}
