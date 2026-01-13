import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraduatesModule } from './graduates/graduates.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: null | Error, allowed?: boolean) => void,
    ) => {
      if (!origin || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Employer Graduate Search API')
    .setDescription('API for employers to find suitable graduates')
    .setVersion('1.0')
    .addTag('graduates')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, GraduatesModule],
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
