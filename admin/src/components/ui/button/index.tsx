import cn from 'classnames';
import { MouseEvent } from 'react';

import s from './button.module.scss';

type TButtonType = 'primary' | 'secondary' | 'active';
type TButtonWidth = 'full' | 'auto' | 'fit-content';
type TButtonPosition = 'left' | 'right' | 'center' | 'auto';
type TButtonSize = 's' | 'm' | 'l';

type TProps = {
   children: string;
   onClick: () => void | Promise<void>;
   className?: string;
   disabled?: boolean;
   size?: TButtonSize;
   variant?: TButtonType;
   width?: TButtonWidth;
   position?: TButtonPosition;
};

export const Button = ({
   onClick,
   className = '',
   disabled = false,
   children,
   size = 'm',
   variant = 'primary',
   width = 'auto',
   position = 'auto',
}: TProps) => {
   const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      await onClick();
   };

   return (
      <button
         disabled={disabled}
         onClick={handleClick}
         className={cn(s.button, s[variant], s[size], s[width], s[position], className, {
            [s.disabled]: disabled,
         })}
      >
         {children}
      </button>
   );
};
