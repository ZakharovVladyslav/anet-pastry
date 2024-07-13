'use client';

import { ChangeEvent } from 'react';

import { PlusIcon } from '@/icons';

import s from './file.module.scss';

type TProps = {
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const FilePicker = ({ onChange }: TProps) => {
   return (
      <>
         <label htmlFor="file-picker" className={s.label}>
            <PlusIcon className={s.plusIcon} />
         </label>
         <input
            type="file"
            id="file-picker"
            onChange={onChange}
            className={s.filePicker}
            hidden
         />
      </>
   );
};
