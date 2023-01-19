import { Module } from '@nestjs/common';
import { RulesStatusPredictionController } from './rules-status-prediction.controller';
import { RulesStatusPredictionService } from './rules-status-prediction.service';

@Module({
  controllers: [RulesStatusPredictionController],
  providers: [RulesStatusPredictionService]
})
export class RulesStatusPredictionModule { }
