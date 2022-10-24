import { Test, TestingModule } from '@nestjs/testing';
import { EnterExitService } from './enter-exit.service';

describe('EnterExitService', () => {
  let service: EnterExitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnterExitService],
    }).compile();

    service = module.get<EnterExitService>(EnterExitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
