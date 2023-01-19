import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirstPathRequest, NextStatusRequest } from './models/dto/dto.interface';
import { RulesStatusPredictionService } from './rules-status-prediction.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('rules-status-prediction')
@Controller('rules-status-prediction')
export class RulesStatusPredictionController {

    constructor(private readonly rulesServices: RulesStatusPredictionService) { }

    @Post('status')
    getNextStatus(@Body() body: NextStatusRequest): number[] {
        return this.rulesServices.giveNextStatus(body)
    }

    @Post('path')
    getFirstPath(@Body() body: FirstPathRequest): { [key: string]: number[] } {
        return this.rulesServices.giveFirstPath(body)
    }

    @Get('show')
    showPath(): { [key: string]: {} } {
        return this.rulesServices.showAllPaths()
    }


}
