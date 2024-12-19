import { Test, TestingModule } from '@nestjs/testing';
import { RunningRealityController } from './running-reality.controller';

describe('RunningRealityController', () => {
  let controller: RunningRealityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunningRealityController],
    }).compile();

    controller = module.get<RunningRealityController>(RunningRealityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
