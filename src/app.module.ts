import { Module } from '@nestjs/common';
import { RulesStatusPredictionModule } from './modules/rules-status-prediction/rules-status-prediction.module';
import { ModelsModule } from './modules/models/models.module';

@Module({
  imports: [RulesStatusPredictionModule, ModelsModule],

})
export class AppModule { }
