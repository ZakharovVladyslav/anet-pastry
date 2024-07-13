'use client';

import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';

import { Button, Input, Loader } from '@/components';
import { findError } from '@/const';
import { EFieldType } from '@/enums';
import { fetchAdmin, RootState } from '@/store';
import { validateEmail, validatePassword } from '@/utils';

import s from './signIn.module.scss';

export default function SignInPage() {
   const dispatch = useDispatch();
   const { data: session } = useSession();
   const router = useRouter();
   const t = useTranslations('Auth.SignIn');

   const { adminError } = useSelector((state: RootState) => state.admins);

   const [email, setEmail] = useState<string>('admin@gmail.com');
   const [emailError, setEmailError] = useState<Nullable<string>>(null);
   const [password, setPassword] = useState<string>('admin');
   const [passwordError, setPasswordError] = useState<Nullable<string>>(null);
   const [loginError, setLoginError] = useState<Nullable<string>>(null);
   const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
   const [loaded, setLoaded] = useState<boolean>(false);

   useEffect(() => {
      setLoaded(true);
   }, []);

   useEffect(() => {
      if (loginError) {
         setLoaded(true);
      }
   }, [loginError]);

   useEffect(() => {
      if (!session) return;

      if (adminError) return;

      router.push('/');
   }, [session]);

   useEffect(() => {
      const textValidation = validateEmail(email);

      setEmailError(textValidation.error);
   }, [email]);

   useEffect(() => {
      const textValidation = validatePassword(password);

      setPasswordError(textValidation.error);
   }, [password]);

   useEffect(() => {
      !emailError && !passwordError && email && password
         ? setButtonDisabled(false)
         : setButtonDisabled(true);
   }, [email, password, emailError, passwordError]);

   const handleLogin = async () => {
      setLoaded(false);
      setLoginError(null);

      console.log({ email, password });

      const response = await signIn('credentials', {
         email,
         password,
         redirect: false,
      });

      console.log({ response });

      setLoginError(findError[+response!.error! as keyof typeof findError] ?? null);
      dispatch(fetchAdmin());

      router.push('/');
   };

   return (
      <main className={s.main}>
         {loaded ? (
            <>
               <h1 className={s.title}>Привіт, адміне!</h1>

               <form className={s.form}>
                  <Input
                     type="primary"
                     fieldType={EFieldType.EMAIL}
                     value={email}
                     placeholder={t('email')}
                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                     }}
                     error={emailError}
                  />

                  <Input
                     type="primary"
                     fieldType={EFieldType.PASSWORD}
                     value={password}
                     placeholder={t('password')}
                     onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                     }}
                     error={passwordError}
                  />

                  <p className={s.loginError}>{loginError}</p>

                  <Button onClick={handleLogin} disabled={buttonDisabled}>
                     {t('enter')}
                  </Button>
               </form>
            </>
         ) : (
            <Loader global />
         )}
      </main>
   );
}
