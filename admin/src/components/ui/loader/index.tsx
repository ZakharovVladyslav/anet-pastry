import cn from 'classnames';
import React, { useEffect } from 'react';

import s from './Loader.module.scss';

type TProps = {
   global?: boolean;
};

export function Loader({ global = false }: TProps): JSX.Element {
   useEffect(() => {
      const loader = document.querySelector(`.${s.loader}`) as HTMLDivElement;

      if (!loader) return;

      loader.style.opacity = '1';

      return (() => {
         loader.style.opacity = '0';
      })
   }, [])

   return (
      <div
         className={cn(s.loader, {
            [s.global]: global,
         })}
      >
         <div className={s.spinner} />
      </div>
   );
}
