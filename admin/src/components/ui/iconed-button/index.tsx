import cn from 'classnames';
import { MouseEvent, ReactNode } from 'react';

import s from './iconed-button.module.scss';

type TType = 'primary' | 'secondary';
type TSize =
   | 's'
   | 'm'
   | 'l'
   | 'xl'
   | 'width-s'
   | 'width-m'
   | 'width-l'
   | 'width-full'
   | 'width-half'
   | 'height-full'
   | 'height-half';
type TAspect =
   | 'default'
   | 'video'
   | 'circle'
   | 'square'
   | 'square-s'
   | 'square-m'
   | 'square-l';

type TProps = {
   icon: ReactNode;
   label?: string;
   disabled?: boolean;
   onClick: VoidFunction;
   className?: string;
   iconPosition?: 'left' | 'right';
   type?: TType;
   size?: TSize;
   aspect?: TAspect;
};

export const IconedButton = ({
   icon,
   onClick,
   disabled = false,
   label = '',
   iconPosition = 'left',
   className = '',
   type = 'primary',
   size = 'm',
   aspect = 'default',
}: TProps) => {
   const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      onClick();
   };

   return (
      <button
         disabled={disabled}
         className={cn(
            s.iconedButton,
            className,
            s[type],
            s[size],
            s[aspect],
            s[`${aspect}-${size}`],
            {
               [s.reversed]: iconPosition === 'right',
            },
         )}
         onClick={handleClick}
      >
         {icon} {label && label}
      </button>
   );
};
