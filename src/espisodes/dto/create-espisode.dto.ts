import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsInt, IsNumber } from "class-validator";
import { Transform } from 'class-transformer';

export class EspisodePicture {
    @ApiProperty({
        type: 'string',
        format: 'binary',
    })
    image: Express.Multer.File;
}

export class CreateEspisodeDto {
    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    contentText: string;

    @ApiProperty()
    @IsNumber()
    @Transform(({ value }) => {
        return Number(value);
    })
    workId: number;

    @ApiProperty()
    status: Status;

    @ApiProperty({ type: [EspisodePicture], })
    pictures: EspisodePicture[];
}
