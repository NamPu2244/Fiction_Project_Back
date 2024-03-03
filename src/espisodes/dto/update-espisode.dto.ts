import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEspisodeDto, EspisodePicture } from './create-espisode.dto';
import { Transform, Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

export class UpdateEspisodePicture extends EspisodePicture {
    @ApiProperty({required: false})
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    id?: number;
  }

export class UpdateEspisodeDto extends PartialType(CreateEspisodeDto) {
    @ApiProperty({
        type: [UpdateEspisodePicture],
      })
      @ValidateNested({ each: true })
      @Type(() => UpdateEspisodePicture)
      pictures: UpdateEspisodePicture[];
}
