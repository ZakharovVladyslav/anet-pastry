import { Session } from 'next-auth';

export const refreshToken = async (session: Session) => {
   if (!session) return;

   const refreshToken = session.refreshToken;

   if (!refreshToken) return;

   const response = await fetch('http://localhost:3001/admins/auth/refresh', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${refreshToken}`,
      },
   });

   if (response.ok) {
      const data: TTokens = await response.json();

      session!.accessToken = data.accessToken;
      session!.accessTokenExpiry = data.accessTokenExpiry!;

      return data.accessToken;
   }
};
