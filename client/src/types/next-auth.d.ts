// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
   interface User extends Client {
      name: string;
      surname: string;
      email: string;
      id: string;
      phone: string;
      allergens: string[];
      password?: Nullable<string>;
      accessToken?: string;
      refreshToken?: string;
   }s

   interface Session {
      user: User;
      refreshToken?: string;
      accessToken?: string;
   }
}

declare module 'next-auth/jwt' {
   /**
    * @extends {Client}
    */
   interface JWT extends Client {
      name: string;
      surname: string;
      email: string;
      id: string;
      phone: string;
      allergens: string[];
      refreshToken?: Nullable<string>;
      accessToken?: Nullable<string>;
      accessToken_expiry?: Nullable<number>;
   }
}
