import { ReactNode } from 'react';

import { Divider } from '@/components';

import s from './layout.module.scss';

type TProps = {
   title: string;
   children: ReactNode;
};

export const TabLayout = ({ children, title }: TProps) => {
   return (
      <section className={s.tab}>
         <h1 className={s.title}>{title}</h1>

         <Divider />

         {children}
      </section>
   );
};
