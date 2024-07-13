// import { Injectable, OnModuleInit } from '@nestjs/common';
// import Redis from 'ioredis';

// @Injectable()
// export class RedisService implements OnModuleInit {
//    private client: any;

//    onModuleInit() {
//       this.client = new Redis({
//          host: 'localhost',
//          port: 6379,
//       });
//    }

//    async set(
//       key: string,
//       value: string,
//       expiryMode?: 'EX' | 'PX',
//       time?: number,
//    ): Promise<void> {
//       await this.client.set(key, value, expiryMode, time);
//    }

//    async get(key: string): Promise<string> {
//       const value = await this.client.get(key);
//       return value;
//    }

//    async del(key: string): Promise<void> {
//       await this.client.del(key);
//    }

//    /* SETS */

//    async setPush(key: string, value: string, expiryMode: 'EX' | 'PX', time?: number): Promise<void> {
//       await this.client.sadd(key, value, expiryMode, time);
//    }

//    async isMemberOfSet(key: string, value: string): Promise<boolean> {
//       const result = await this.client.sismember(key, value);
//       return result === 1;
//    }
// }
