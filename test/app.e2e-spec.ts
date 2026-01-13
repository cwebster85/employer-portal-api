import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe('Graduates API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // use DTO validation
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a graduate profile (201)', async () => {
    const res = await request(app.getHttpServer())
      .post('/graduates')
      .send({
        fullName: 'Katy Strang',
        email: 'katy@edtech.com',
        university: 'University of Nottingham',
        degree: 'Computer Science',
        graduationYear: 2025,
        skills: ['History', 'Art', 'Science'],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');

    expect(res.body as { fullName: string }).toBe('Katy Strang');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app.getHttpServer()).post('/graduates').send({
      email: 'missing@data.com',
      // missing required fields like fullName, university etc.
    });

    expect(res.status).toBe(400);
  });

  it('should return 400 for invalid graduation year', async () => {
    const res = await request(app.getHttpServer()).post('/graduates').send({
      fullName: 'Invalid Year',
      email: 'bad@year.com',
      university: 'Nowhere',
      degree: 'Nothing',
      graduationYear: 'not-a-year',
      skills: [],
    });

    expect(res.status).toBe(400);
  });

  it('should return 400 if skills is missing or not an array', async () => {
    const res = await request(app.getHttpServer()).post('/graduates').send({
      fullName: 'Invalid',
      email: 'invalid@x.com',
      university: 'Bad Uni',
      degree: 'Arts',
      graduationYear: 2023,
      skills: 'not-an-array', // invalid type
    });

    expect(res.status).toBe(400);
  });

  it('should return 409 if email already exists', async () => {
    const data = {
      fullName: 'Repeat User',
      email: 'duplicate@x.com',
      university: 'Uni A',
      degree: 'Degree A',
      graduationYear: 2024,
      skills: ['Stuff'],
    };

    await request(app.getHttpServer()).post('/graduates').send(data); // first time

    const res = await request(app.getHttpServer())
      .post('/graduates')
      .send(data); // duplicate

    expect(res.status).toBe(409);
  });
});
