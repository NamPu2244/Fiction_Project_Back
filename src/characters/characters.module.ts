import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService],
  imports: [PrismaModule, AuthModule],
})
export class CharactersModule {}
