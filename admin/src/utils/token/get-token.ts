import { UUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Session } from 'next-auth';

import { refreshToken } from './refresh-token';

export const getToken = async () => {
   const session: Session = await fetch('/api/auth/session').then(response =>
      response.json(),
   );

   if (!session) return null;

   const accessToken = session.accessToken;
   // const accessTokenExpiry = session.accessTokenExpiry;

   if (!accessToken) return null;

   const accessTokenPayload = jwt.decode(accessToken!) as { id: UUID; exp: number };

   if (accessTokenPayload.exp && Date.now() > accessTokenPayload.exp) {
      const refreshedAccessToken = await refreshToken(session);

      if (!refreshedAccessToken) return accessToken;

      return refreshedAccessToken;
   }

   return accessToken;
};
