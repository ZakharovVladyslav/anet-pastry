import NextAuth from 'next-auth';
import { options } from './options';

// init next auth
const handler = NextAuth(options);

// init handlers
export { handler as GET, handler as POST };
