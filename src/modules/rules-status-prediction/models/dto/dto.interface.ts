import { ApiProperty } from "@nestjs/swagger";

export class NextStatusRequest {
    @ApiProperty()
    transition: string[]
}

export class FirstPathRequest {
    @ApiProperty()
    transition: string[];

    @ApiProperty()
    statuses: number[];
}
