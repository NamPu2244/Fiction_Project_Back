import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'D:/project3.2/fic_toon/public/img/work',
        filename: (req, file, cb) => {
          console.log(file);
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() createCharacterDto: CreateCharacterDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // if (req.user.role != 'CREATOR') {
    //   throw new UnauthorizedException();
    // }
    return await this.charactersService.create(
      createCharacterDto,
      req.user,
      file,
    );
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'D:/project3.2/fic_toon/public/img/work',
        filename: (req, file, cb) => {
          console.log(file);
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.charactersService.update(+id, updateCharacterDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.charactersService.remove(+id);
  }
}
