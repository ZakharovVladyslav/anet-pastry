import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
   UsersModule,
   ProductsModule,
   OrderModule,
   AdminsModule,
   AuthModule,
} from './routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
   AdminsEntity,
   OrdersEntity,
   ProductsEntity,
   RefreshTokenEntity,
   UsersEntity,
} from './entities';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DB_ENVS } from './envs';

@Module({
   imports: [
      ProductsModule,
      OrderModule,
      UsersModule,
      AdminsModule,
      AuthModule,
      TypeOrmModule.forRoot({
         type: 'postgres',
         host: 'localhost',
         port: 5433,
         username: 'lcashe',
         password: '135794ee497531E@#',
         database: 'postgres',
         entities: [
            ProductsEntity,
            OrdersEntity,
            UsersEntity,
            AdminsEntity,
            RefreshTokenEntity,
         ],
         synchronize: true,
      }),
      ServeStaticModule.forRoot({
         rootPath: join(__dirname, '../src/images'),
         serveRoot: '/images',
      }),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {
   constructor() {}
}
