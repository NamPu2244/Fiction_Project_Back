import { Module } from '@nestjs/common';
import { EspisodesService } from './espisodes.service';
import { EspisodesController } from './espisodes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EspisodesController],
  providers: [EspisodesService],
  imports: [PrismaModule, AuthModule],
})
export class EspisodesModule {}
