import { UUID } from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import { ERole } from '@/enums';

declare module 'next-auth' {
   interface User extends Client {
      role: ERole;
      email: string;
      password: string;
      name: string;
      surname: string;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpiry: number;
      id: UUID;
   }

   interface Session {
      user: User;
      accessToken: string;
      refreshToken: string;
      accessTokenExpiry: number;
      error?: string;
   }
}

declare module 'next-auth/jwt' {
   /**
    * @extends {Client}
    */
   interface JWT extends Client {
      role: ERole;
      email: string;
      password: string;
      name: string;
      surname: string;
      accessToken: string;
      accessTokenExpiry: number;
      refreshToken: string;
      id: UUID;
   }
}
