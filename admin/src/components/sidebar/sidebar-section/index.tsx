import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';

import { allowedTabs } from '@/const';
import { ESidebarSectionKey } from '@/enums';
import { RootState } from '@/store';

import { SidebarTab } from '../tabs/tab';
import s from './sidebar-section.module.scss';

type TProps = {
   sectionKey: ESidebarSectionKey;
};

export const SidebarSection = ({ sectionKey }: TProps) => {
   const { admin } = useSelector((state: RootState) => state.admins);

   const t = useTranslations('Sidebar');

   return (
      <section className={s.sidebarSection}>
         <h1 className={s.title}>{t(sectionKey)}</h1>

         <section className={s.sectionLinks}>
            {allowedTabs &&
               allowedTabs[admin.role as keyof typeof allowedTabs] &&
               Object.values(
                  allowedTabs[admin.role as keyof typeof allowedTabs][sectionKey],
               ).map((key, index) => <SidebarTab key={index} label={key} />)}
         </section>
      </section>
   );
};
