import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GraduatesController } from './graduates.controller';
import { GraduatesService } from './graduates.service';

describe('GraduatesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [GraduatesController],
      providers: [GraduatesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a graduate profile', async () => {
    const response = await request(app.getHttpServer())
      .post('/graduates')
      .send({
        fullName: 'Katy Strang',
        email: 'katy@edtech.com',
        university: 'Wallingford',
        degree: 'Computer Science',
        graduationYear: 2025,
        skills: ['JavaScript', 'React', 'Node.js'],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
