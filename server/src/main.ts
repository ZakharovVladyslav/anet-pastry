import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://130.0.233.142:3000',
      'http://130.0.233.142:3002',
   ];

   app.enableCors({
      origin: function (origin, callback) {
         if (!origin) return callback(null, true);
         if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('Not allowed by CORS'), false);
         }
         return callback(null, true);
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
   });

   app.use(cookieParser());

   await app.listen(3001);
}
bootstrap();
