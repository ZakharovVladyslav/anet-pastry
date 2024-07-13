import { UUID } from 'crypto';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
   session: {
      maxAge: 12 * 60 * 60,
   },
   secret: process.env.JWT_SECRET,
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            username: { label: 'Username', type: 'text' },
            password: { label: 'Password', type: 'password' },
         },
         authorize: async credentials => {
            const response = await fetch(`${process.env.SERVER_URL}/admins/auth/login`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(credentials),
            });

            if (response.status === 404) {
               throw new Error('404');
            }

            if (response.status === 403) {
               throw new Error('403');
            }

            const data = await response.json();

            const user = await fetch(`${process.env.SERVER_URL}/admins/admin`, {
               headers: {
                  Authorization: `Bearer ${data.accessToken}`,
               },
            }).then(res => res.json());

            return {
               ...user,
               accessToken: data.accessToken,
               refreshToken: data.refreshToken,
               accessTokenExpiry: data.accessTokenExpiry,
            };
         },
      }),
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id as UUID;
            token.email = user.email;
            token.name = user.name;
            token.surname = user.surname;
            token.role = user.role;
            token.accessToken = user.accessToken!;
            token.refreshToken = user.refreshToken!;
            token.accessTokenExpiry = user.accessTokenExpiry!;
         }

         return token;
      },
      async session({ session, token }) {
         session.user.email = token.email;
         session.user.role = token.role;
         session.user.surname = token.surname;
         session.user.name = token.name;
         session.user.id = token.id;
         session.accessToken = token.accessToken;
         session.refreshToken = token.refreshToken;
         session.accessTokenExpiry = token.accessTokenExpiry;

         return session;
      },
   },
};
