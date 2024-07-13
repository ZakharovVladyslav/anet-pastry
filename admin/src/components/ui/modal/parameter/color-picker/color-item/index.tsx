'use client';

import { IconedButton } from '@/components';
import { TrashIcon } from '@/icons';

import s from './color-item.module.scss';

type TProps = {
   color: string;
   removeColor: (color: string) => void;
};

export const ColorItem = ({ color, removeColor }: TProps) => {
   const handleRemoveColor = () => {
      removeColor(color);
   };

   return (
      <div className={s.wrapper}>
         <div className={s.color} style={{ backgroundColor: color }}></div>

         <IconedButton
            className={s.trash}
            icon={<TrashIcon />}
            onClick={handleRemoveColor}
         />
      </div>
   );
};
