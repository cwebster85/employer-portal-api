import { Test, TestingModule } from '@nestjs/testing';
import { GraduatesService } from './graduates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Graduate } from './entities/graduate.entity';

describe('GraduatesService', () => {
  let service: GraduatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GraduatesService,
        {
          provide: getRepositoryToken(Graduate),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GraduatesService>(GraduatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
