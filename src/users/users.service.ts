import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { DonateDto } from './dto/donate.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.findAll();
    let data = {
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      name: createUserDto.name,
      role: createUserDto.role,
    };
    for (const item of users) {
      if (createUserDto.username == item.username) {
        return {
          status: 500,
          massage: 'Username Already Exits',
        };
      }

      if (createUserDto.email == item.email) {
        return {
          status: 500,
          massage: 'Email Already Exits',
        };
      }
    }
    if (createUserDto.passwordConfirm == createUserDto.password) {
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        roundsOfHashing,
      );
      createUserDto.password = hashedPassword;
      data.password = createUserDto.password;
    } else {
      return {
        status: 500,
        message: 'Password Are Not Same',
      };
    }
    const createUser = await this.prisma.user.create({ data });
    return {
      status: 200,
      data: createUser,
    };
  }

  async donate(donateDto: DonateDto, req: any) {
    const data = {
      coin: donateDto.coin,
      userId: req.id,
      characterId: donateDto.characterId,
    };

    const getDataUser = await this.prisma.user.findFirst({
      where: { id: req.id },
    });

    const findUserByCharacter = await this.prisma.character.findFirst({
      where: { id: data.characterId },
      include: { work: { include: { user: true } } },
    });
    if(req.id == findUserByCharacter.work.user.id){
      return {
        statusCode: 500,
        massage: 'ไม่สามารถสนับสนุนตัวละครของตัวเองได้'
      }
    }

    if (getDataUser.coin >= data.coin) {
      const total = getDataUser.coin - data.coin;
      const updateCoin = await this.prisma.user.update({
        where: { id: req.id },
        data: { coin: total },
      });

      if (updateCoin) {
        const createTrans = await this.prisma.userDonate.create({ data });
        if (createTrans) {
          const total = findUserByCharacter.work.user.coin + data.coin;
          await this.prisma.user.update({
            where: { id: findUserByCharacter.work.user.id },
            data: { coin: total },
          });
          console.log(findUserByCharacter);
        }
        return {
          statusCode: 200,
          data: createTrans,
        };
      }
    } else {
      return {
        massage: 'กรุณาตรวจสอบยอดเงินของคุณ',
      };
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
