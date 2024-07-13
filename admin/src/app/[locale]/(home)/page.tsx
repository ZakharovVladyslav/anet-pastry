'use client';

import { Tab } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Loader, Sidebar } from '@/components';
import { Workspace } from '@/components';
import { RootState } from '@/store';

import s from './page.module.scss';

export default function Home() {
   const { data: session } = useSession();
   const router = useRouter();

   const { admin, adminError } = useSelector((state: RootState) => state.admins);

   const [loaded, setLoaded] = useState<boolean>(false);

   useEffect(() => {
      if (!adminError) return;

      router.push('/auth/signIn');
      return;
   }, [adminError]);

   useEffect(() => {
      if (session?.error === 'RefreshAccessTokenError') {
         signIn();
      }
      if (!session && session !== null) return;
      if (!session && session === null) {
         router.push('/auth/signIn');
         return;
      }

      if (loaded) return;
      setLoaded(true);
   }, [session]);

   return (
      <>
         {loaded ? (
            <main className={s.main}>
               {admin && (
                  <Tab.Group>
                     <Sidebar />
                     <Workspace />
                  </Tab.Group>
               )}
            </main>
         ) : (
            <Loader />
         )}
      </>
   );
}
