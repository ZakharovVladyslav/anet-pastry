'use client';

import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store';

import './globals.scss';

import { translations } from '@/translations';
import { TLocale } from '@/types/locale';

interface LayoutProps {
   children: ReactNode;
   session: never;
   params: { locale: string };
}

export default function RootLayout({
   children,
   session,
   params: { locale },
}: LayoutProps): JSX.Element {
   const messages = translations[locale as TLocale];

   if (!translations) {
      notFound();
   }

   return (
      <html lang={locale}>
         <body>
            <Provider store={store}>
               <PersistGate persistor={persistor}>
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
