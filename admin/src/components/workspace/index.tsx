import { Tab } from '@headlessui/react';

import { useSelector } from 'react-redux';
import { allowedTabs, panelByAllowedTab } from '@/const';
import { RootState } from '@/store';

import s from './workspace.module.scss';

export const Workspace = () => {
   const { admin } = useSelector((state: RootState) => state.admins);

   return (
      <section className={s.workspace}>
         <Tab.Panels>
            {admin &&
               admin.role &&
               Object.values(
                  allowedTabs[admin.role as keyof typeof allowedTabs].shop,
               ).map((key, index) => {
                  const Panel = panelByAllowedTab[key];

                  return (
                     <Tab.Panel key={index}>
                        <Panel />
                     </Tab.Panel>
                  );
               })}
            {admin &&
               admin.role &&
               Object.values(
                  allowedTabs[admin.role as keyof typeof allowedTabs].system,
               ).map((key, index) => {
                  const Panel = panelByAllowedTab[key];

                  return (
                     <Tab.Panel key={index}>
                        <Panel />
                     </Tab.Panel>
                  );
               })}
         </Tab.Panels>
      </section>
   );
};

export * from './tabs';
