import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
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
