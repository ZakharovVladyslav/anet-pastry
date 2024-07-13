import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { options } from '../[...nextauth]/options';

export async function GET(req: NextRequest, res: NextResponse) {
   const session = await getServerSession(
      req as unknown as NextApiRequest,
      {
         ...res,
         getHeader: (name: string) => res.headers?.get(name),
         setHeader: (name: string, value: string) => res.headers?.set(name, value),
      } as unknown as NextApiResponse,
      options,
   );

   return NextResponse.json(session);
}
