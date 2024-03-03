import { ApiProperty } from "@nestjs/swagger"
import { Category, Status, Type } from "@prisma/client"
import { IsEnum } from "class-validator"

export class CreateWorkDto {

    @ApiProperty({ required: true, })
    title: string

    @ApiProperty({ type: "string", format: "binary" })
    file: Express.Multer.File

    @ApiProperty({ required: true, })
    tagline: string

    @IsEnum(Type)
    @ApiProperty({ required: true, })
    type: Type

    @IsEnum(Category)
    @ApiProperty({ required: true, })
    category: Category

    @ApiProperty({ required: true, })
    intro: string

    @IsEnum(Status)
    @ApiProperty({ required: true, })
    status: Status

}
