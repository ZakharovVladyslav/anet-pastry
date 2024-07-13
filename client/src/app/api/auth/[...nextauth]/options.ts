import { Account, NextAuthOptions, Session, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
   session: {
      maxAge: 30 * 24 * 60 * 60,
   },
   secret: process.env.JWT_SECRET,
   providers: [
      CredentialsProvider({
         name: 'Login',
         credentials: {
            email: { label: 'Email', type: 'text', placeholder: 'Email' },
            password: { label: 'Password', type: 'password', placeholder: 'Password' },
         },
         type: 'credentials',
         async authorize(credentials) {
            const response = (await fetch('http://localhost:3001/auth/login', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
               }),
            }).then(res => res.json())) as {
               accessToken: string;
               refreshToken: string;
            };

            const user = (await fetch('http://localhost:3001/users/user', {
               headers: {
                  Authorization: `Bearer ${response.accessToken}`,
               },
            }).then(res => res.json())) as User;

            return {
               ...user,
               accessToken: response.accessToken,
               refreshToken: response.refreshToken,
            };
         },
      }),
   ],
   callbacks: {
      async jwt({
         token,
         user,
      }: {
         token: JWT;
         user: User | AdapterUser;
         account: Nullable<Account>;
      }) {
         if (user) {
            token.id = user.id;
            token.name = user.name;
            token.surname = user.surname;
            token.email = user.email;
            token.phone = user.phone;
            token.allergens = user.allergens;
            token.password = user.password;
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
         }

         return token;
      },
      async session({ session, token }: { session: Session; token: JWT }) {
         if (!token) {
            return session;
         }

         session.user!.id = token.id;
         session.user!.name = token.name;
         session.user!.surname = token.surname;
         session.user!.email = token.email;
         session.user!.phone = token.phone;
         session.user!.allergens = token.allergens;
         session.accessToken = token.accessToken as string;
         session.refreshToken = token.refreshToken as string;

         return session;
      },
   },
};
