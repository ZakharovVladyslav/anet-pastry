'use client';

import { Listbox } from '@headlessui/react';
import cn from 'classnames';

import { CSSProperties, ReactNode } from 'react';
import { CheckMarkIcon, ChevronDownIcon } from '@/icons';

import s from './select.module.scss';

type TSelectSize = 's' | 'm' | 'full';

type TProps = {
   options: TOption[];
   onChange: (value: string | string[]) => void;
   label?: string | ReactNode;
   multiple?: boolean;
   value?: string | string[];
   internalValue: string | string[];
   selectorLabel?: string;
   placeholder?: string;
   size?: TSelectSize;
   style?: CSSProperties;
};

export const Select = ({
   onChange,
   options,
   label,
   multiple,
   value,
   internalValue,
   placeholder = '',
   size = 'm',
   style,
}: TProps) => {
   const valueExists = value && value.length > 0;

   return (
      <div className={cn(s.selectWrapper, s[size])} style={style}>
         {label && <p className={s.label}>{label}</p>}

         <Listbox value={internalValue} onChange={onChange} multiple={multiple}>
            {({ open }) => (
               <>
                  <Listbox.Button
                     className={cn(s.select, {
                        [s.opened]: open,
                     })}
                  >
                     {valueExists ? (
                        Array.isArray(value) ? (
                           value.join(', ')
                        ) : (
                           value
                        )
                     ) : (
                        <span className={s.placeholder}>{placeholder}</span>
                     )}

                     <ChevronDownIcon className={s.pointer} />
                  </Listbox.Button>

                  <Listbox.Options
                     className={cn(s.options, {
                        [s.opened]: open,
                     })}
                  >
                     {options.map(option => (
                        <Listbox.Option
                           key={option.key}
                           value={option.key}
                           className={({ selected }) =>
                              cn(s.item, {
                                 [s.active]: selected,
                              })
                           }
                        >
                           {({ selected }) => (
                              <>
                                 <span>{option.label}</span>
                                 {selected && <CheckMarkIcon />}
                              </>
                           )}
                        </Listbox.Option>
                     ))}
                  </Listbox.Options>
               </>
            )}
         </Listbox>
      </div>
   );
};
