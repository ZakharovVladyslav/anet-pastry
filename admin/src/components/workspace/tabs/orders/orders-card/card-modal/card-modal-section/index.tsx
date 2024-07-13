import { ReactNode } from 'react';
import { useTranslations } from 'use-intl';

import s from './card-modal-section.module.scss';

type TProps = {
   titleKey: string;
   children: ReactNode;
};

export const CardModalSection = ({ titleKey, children }: TProps) => {
   const t = useTranslations('Modal.Orders.Titles');

   return (
      <>
         <h1 className={s.title}>{t(titleKey)}</h1>

         <section className={s.subsection}>{children}</section>
      </>
   );
};
