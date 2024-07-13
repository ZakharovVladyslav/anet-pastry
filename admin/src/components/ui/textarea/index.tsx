'use client';

import classNames from 'classnames';
import { ChangeEventHandler } from 'react';

import s from './textarea.module.scss';

type TType = 'primary';
type TSize = 's' | 'm' | 'l';

type TProps = {
   value: string;
   onChange: ChangeEventHandler<HTMLTextAreaElement>;
   disabled?: boolean;
   label?: string;
   placeholder?: string;
   variant?: TType;
   size?: TSize;
};

export const Textarea = ({
   onChange,
   value,
   disabled = false,
   label,
   placeholder,
   variant = 'primary',
   size = 'm',
}: TProps) => {
   return (
      <div className={classNames(s.textareaWrapper, classNames, s[variant], s[size])}>
         {label && <p className={s.label}>{label}</p>}

         <textarea
            value={value}
            onChange={onChange}
            className={s.textarea}
            placeholder={placeholder}
            disabled={disabled}
         ></textarea>
      </div>
   );
};
