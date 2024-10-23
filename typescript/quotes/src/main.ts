import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true
  }));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
  logger.log('app is listening on port 3000');
}
bootstrap();
