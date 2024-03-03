import { ApiProperty } from '@nestjs/swagger';
import { RoleAs } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
export class CreateCharacterDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @IsEnum(RoleAs)
  @ApiProperty({ required: true })
  roleAs: RoleAs;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => {
      return Number(value);
  })
  workId: number;
}
