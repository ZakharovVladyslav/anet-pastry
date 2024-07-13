import cn from 'classnames';

import s from './divider.module.scss';

type TProps = {
   axis?: 'x' | 'y';
};

export const Divider = ({ axis = 'x' }: TProps) => {
   return (
      <div
         className={cn(s.divider, {
            [s.x]: axis === 'x',
            [s.y]: axis === 'y',
         })}
      ></div>
   );
};
