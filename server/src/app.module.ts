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
         host: DB_ENVS.HOST,
         port: +DB_ENVS.PORT,
         username: DB_ENVS.USERNAME,
         password: DB_ENVS.PASSWORD,
         database: DB_ENVS.DATABASE,
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
