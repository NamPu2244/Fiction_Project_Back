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
import { WorksService } from './works.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    @Body() createWorkDto: CreateWorkDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(req.user.role);
    if (req.user.role != 'CREATOR') {
      throw new UnauthorizedException();
    }
    return await this.worksService.create(createWorkDto, req.user, file);
  }

  @Get()
  async findAll() {
    return await this.worksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/findAllByUser')
  async findAllByUser(@Request() req: any) {
    console.log(req.user.id);
    return await this.worksService.findAllByUser(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.worksService.findOne(+id);
  }
  
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    @Body() updateWorkDto: UpdateWorkDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.user.role != 'CREATOR') {
      throw new UnauthorizedException();
    }
    return await this.worksService.update(+id, updateWorkDto, file);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user.role != 'CREATOR') {
      throw new UnauthorizedException();
    }
    return await this.worksService.remove(+id);
  }
}
