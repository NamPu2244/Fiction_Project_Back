import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WorksController],
  providers: [WorksService],
  imports: [PrismaModule, AuthModule],
})
export class WorksModule { }
