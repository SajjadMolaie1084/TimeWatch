import { Test, TestingModule } from '@nestjs/testing';
import { EnterExitController } from './enter-exit.controller';

describe('EnterExitController', () => {
  let controller: EnterExitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterExitController],
    }).compile();

    controller = module.get<EnterExitController>(EnterExitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
