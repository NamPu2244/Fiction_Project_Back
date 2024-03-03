import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Espisode } from "@prisma/client";

export class EspisodeEntity implements Espisode {

    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    contentText: string;

    @ApiProperty()
    workId: number;

    @ApiProperty()
    status: $Enums.Status;

}
