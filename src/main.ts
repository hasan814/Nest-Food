import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors();

  const { PORT = 3000 } = process.env;
  await app.listen(PORT);

  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs available at http://localhost:${PORT}/swagger`);
}

bootstrap();
