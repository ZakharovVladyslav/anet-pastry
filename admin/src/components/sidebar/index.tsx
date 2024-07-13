'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { capitalize } from '@/utils';
import { Loader } from '../ui';

import s from './Sidebar.module.scss';

import { SidebarTabs } from './tabs';

export const Sidebar = () => {
   const [loaded, setLoaded] = useState<boolean>(true);

   const { admin } = useSelector((state: RootState) => state.admins);

   useEffect(() => {
      if (admin) {
         setLoaded(true);
      }
   }, [admin]);

   return (
      <section className={s.sidebar}>
         {loaded ? (
            <>
               <section className={s.adminInfo}>
                  <div className={s.avatarPlaceholder}>
                     {admin?.name && capitalize(admin?.name.substring(0, 1) as string)}
                  </div>

                  <div className={s.infoSection}>
                     <h1 className={s.name}>
                        {admin?.name && capitalize(admin?.name as string)}
                     </h1>
                     <p className={s.role}>
                        {admin?.name && capitalize(admin?.role as string)}
                     </p>
                  </div>
               </section>

               <SidebarTabs />
            </>
         ) : (
            <Loader />
         )}
      </section>
   );
};
