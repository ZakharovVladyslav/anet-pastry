import classNames from 'classnames';
import { ChangeEventHandler, ReactNode } from 'react';

import { EFieldType } from '@/enums';
import { ErrorIcon } from '@/icons';

import s from './iconedInput.module.scss';

type TType = 'primary';

type TProps = {
   value: string;
   onChange: ChangeEventHandler<HTMLInputElement>;
   error?: Nullable<string>;
   className?: string;
   disabled?: boolean;
   fieldType?: EFieldType;
   iconBefore?: ReactNode;
   iconAfter?: ReactNode;
   type?: TType;
   label?: string;
   placeholder?: string;
   id?: string;
};

export const IconedInput = ({
   value,
   onChange,
   error = null,
   className = '',
   disabled = false,
   fieldType = EFieldType.TEXT,
   iconBefore,
   iconAfter,
   type = 'primary',
   label,
   placeholder,
   id = '',
}: TProps) => {
   return (
      <div className={classNames(s.iconedInputWrapper, className, s[type])}>
         {label && <label className={s.label}>{label}</label>}

         <div className={s.inputWrapper}>
            {iconBefore && <div className={s.iconBefore}>{iconBefore}</div>}

            <input
               id={id}
               type={fieldType}
               value={value}
               onChange={onChange}
               disabled={disabled}
               placeholder={placeholder}
               className={s.input}
            />

            {iconAfter && <div className={s.iconBefore}>{iconAfter}</div>}
         </div>

         {error && (
            <p className={s.errorWrapper}>
               <ErrorIcon /> <span className={s.error}>{error}</span>
            </p>
         )}
      </div>
   );
};
