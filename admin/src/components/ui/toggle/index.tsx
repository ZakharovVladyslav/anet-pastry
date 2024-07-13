'use client';

import classNames from 'classnames';
import { ChangeEventHandler } from 'react';

import s from './toggle.module.scss';

type TProps = {
   checked: boolean;
   onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const Toggle = ({ checked, onChange }: TProps) => {
   return (
      <>
         <label
            htmlFor="toggle"
            className={classNames(s.toggleLabel, {
               [s.checked]: checked,
            })}
         >
            <span className={classNames(s.circle)}></span>
         </label>

         <input
            id="toggle"
            type="checkbox"
            hidden
            checked={checked}
            onChange={onChange}
         />
      </>
   );
};
