import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { ChangeEventHandler } from 'react';

import { EFieldType } from '@/enums';
import { ErrorIcon } from '@/icons';

import s from './Input.module.scss';

type TType = 'primary';
type TSize = 's' | 'm' | 'l';

type TProps = {
   value: string;
   onChange: ChangeEventHandler<HTMLInputElement>;
   error?: Nullable<string>;
   className?: string;
   disabled?: boolean;
   fieldType?: EFieldType;
   type?: TType;
   label?: string;
   placeholder?: string;
   id?: string;
   size?: TSize;
   optional?: boolean;
};

export const Input = ({
   value,
   onChange,
   error = null,
   className = '',
   disabled = false,
   fieldType = EFieldType.TEXT,
   type = 'primary',
   label,
   placeholder,
   id = '',
   size = 'm',
   optional = false,
}: TProps) => {
   const t = useTranslations();

   return (
      <div className={classNames(s.inputWrapper, className, s[type], s[size])}>
         {label && (
            <label className={s.label}>
               {label} {optional && <span>&#40;{t('Modal.Product.optional')}&#41;</span>}
            </label>
         )}

         <input
            id={id}
            type={fieldType}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={`${placeholder} ${!label && optional ? '(?)' : ''}`}
            className={s.input}
         />

         {error && (
            <p className={s.errorWrapper}>
               <ErrorIcon /> <span className={s.error}>{error}</span>
            </p>
         )}
      </div>
   );
};
