import jwt, { JwtPayload } from 'jsonwebtoken';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

export const refreshToken = async (session: Session) => {
   if (!session) return null;

   const refreshToken = session.refreshToken;

   if (!refreshToken) return;

   const refreshTokenPayload = jwt.decode(refreshToken!) as JwtPayload;
   const refreshTokenExp = refreshTokenPayload.exp ?? 0;

   if (refreshTokenExp && Date.now() > refreshTokenExp && session) {
      signOut();
   }

   const response = await fetch('http://localhost:3001/auth/refresh', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${refreshToken}`,
      },
   });

   if (response.ok) {
      const data: TTokens = await response.json();

      return data.accessToken;
   }
};
