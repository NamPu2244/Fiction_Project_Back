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
  UploadedFiles,
} from '@nestjs/common';
import { EspisodesService } from './espisodes.service';
import { CreateEspisodeDto } from './dto/create-espisode.dto';
import { UpdateEspisodeDto } from './dto/update-espisode.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('espisodes')
export class EspisodesController {
  constructor(private readonly espisodesService: EspisodesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    AnyFilesInterceptor({
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
    @Body() createEspisodeDto: CreateEspisodeDto,
    @Request() req: any,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    console.log(images)
    return this.espisodesService.create(createEspisodeDto, images);
  }

  @Get()
  findAll() {
    return this.espisodesService.findAll();
  }

  @Get('/findByWorkId/:id')
  findAllByWorkId(@Param('id') id: string) {
    return this.espisodesService.findAllByWorkId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.espisodesService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: 'D:/project3.2/fic_toon/public/img/work',
        filename: (req, file, cb) => {
          // console.log(file);
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateEspisodeDto: UpdateEspisodeDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    console.log(images)
    return await this.espisodesService.update(+id, updateEspisodeDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.espisodesService.remove(+id);
  }

  @Delete('/deletePic/:id')
  async deletePic(@Param('id') id: string) {
    return await this.espisodesService.deleteEpPic(+id);
  }
}
