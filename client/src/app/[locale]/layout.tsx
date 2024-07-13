'use client';

import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '@/store';
import { translations } from '@/translations';
import { TLocale } from '@/types/locale';

import './globals.scss';

interface LayoutProps {
   children: ReactNode;
   params: { locale: TLocale };
   session: never;
}

export default function RootLayout({
   children,
   params: { locale },
   session,
}: LayoutProps) {
   const messages = translations[locale as TLocale];

   if (!translations) {
      notFound();
   }

   return (
      <html lang={locale}>
         <body>
            <Provider store={store}>
               <PersistGate persistor={persistor} loading={null}>
                  <SessionProvider session={session}>
                     <NextIntlClientProvider messages={messages} locale={locale}>
                        {children}
                     </NextIntlClientProvider>
                  </SessionProvider>
               </PersistGate>
            </Provider>
         </body>
      </html>
   );
}
