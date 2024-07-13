import { UUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Session } from 'next-auth';

import { refreshToken } from './refreshToken';

export const getToken = async (session?: Session) => {
   if (!session) return null;

   const accessToken = session.accessToken;

   if (!accessToken) return accessToken;

   const accessTokenPayload = jwt.decode(accessToken!) as { id: UUID; exp: number };
   if (accessTokenPayload.exp && Date.now() > accessTokenPayload.exp) {
      const refreshedAccessToken = await refreshToken(session);
      if (!refreshedAccessToken) return accessToken;

      return refreshedAccessToken;
   }

   return accessToken;
};
