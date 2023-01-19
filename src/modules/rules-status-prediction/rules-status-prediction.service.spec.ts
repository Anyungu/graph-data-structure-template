import { Test, TestingModule } from '@nestjs/testing';
import { FirstPathRequest, NextStatusRequest } from './models/dto/dto.interface';
import { RulesStatusPredictionService } from './rules-status-prediction.service';

describe('RulesStatusPrediction', () => {
  let provider: RulesStatusPredictionService;
  let nextStatusRequest: NextStatusRequest = new NextStatusRequest();
  let firstPathRequest: FirstPathRequest = new FirstPathRequest();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulesStatusPredictionService],
    }).compile();

    provider = module.get<RulesStatusPredictionService>(RulesStatusPredictionService);
    provider.onModuleInit()
    nextStatusRequest.transition = ["r", "a", "s"]
    firstPathRequest.transition = ["r", "a", "s"]
    firstPathRequest.statuses = [2]
  });



  it('should give an array of all possible end statuses', () => {
    expect(provider.giveNextStatus(nextStatusRequest)).toStrictEqual([5, 1]);
  });

  it('should give an array of a possible path', () => {
    expect(provider.giveFirstPath(firstPathRequest)).toStrictEqual({2: [2, 3, 4, 5]});
  });
});
