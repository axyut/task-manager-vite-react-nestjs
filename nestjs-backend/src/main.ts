import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';

async function start() {
  const app = await NestFactory.create(AppModule);

  // global guard
  app.useGlobalGuards(new JwtAuthGuard());

  await app.listen(3000);
}
start();
