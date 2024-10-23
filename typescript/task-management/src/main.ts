import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common'

async function bootstrap() {

  const logger = new Logger()
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor())
  const port = 3000
  console.log("NOD ENV", process.env.DB_NAME)
  await app.listen(port);
  logger.log(`application listening on port ${port}`)
}
bootstrap();
