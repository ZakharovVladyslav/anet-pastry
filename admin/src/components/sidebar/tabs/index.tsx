import { Tab } from '@headlessui/react';

import { tabs } from '@/const';
import { ESidebarSectionKey } from '@/enums';

import { SidebarSection } from '../sidebar-section';

import s from './tabs.module.scss';

export const SidebarTabs = () => {
   return (
      <Tab.List className={s.tabs}>
         {Object.keys(tabs).map((key, index) => (
            <SidebarSection sectionKey={key as ESidebarSectionKey} key={index} />
         ))}
      </Tab.List>
   );
};
