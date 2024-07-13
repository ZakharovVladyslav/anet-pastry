import { Tab } from '@headlessui/react';
import cn from 'classnames';
import { Fragment } from 'react';
import { useTranslations } from 'use-intl';

import s from './tab.module.scss';

type TProps = {
   label: string;
};

export const SidebarTab = ({ label }: TProps) => {
   const t = useTranslations('Sidebar.Tabs');

   return (
      <Tab as={Fragment}>
         {({ selected }) => (
            <button
               className={cn(s.tab, {
                  [s.active]: selected,
               })}
            >
               {t(label)}
            </button>
         )}
      </Tab>
   );
};
