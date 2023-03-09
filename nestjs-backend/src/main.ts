import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';

async function start() {
  const app = await NestFactory.create(AppModule);

  // global guard
  app.useGlobalGuards(new JwtAuthGuard());

  // swagger -> api documentation
  const options = new DocumentBuilder()
    .setTitle('Task Manager App')
    .setDescription('Task Manager App API by Swagger')
    .setVersion('2.0')
    // add bearer because of jwt token used
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter Jwt Token.',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  // visit :3000/api to view swagger UI

  // Server
  await app.listen(3000);
}
start();
