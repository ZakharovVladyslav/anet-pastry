'use client';

import clsx from 'clsx';
import { Fragment } from 'react';

import { CheckMarkIcon } from '@/icons';

import s from './milestone-tracker.module.scss';

export const MilestoneTracker = ({
   milestones,
   size = 'm',
   variant = 'primary',
   activeMilestone,
   completed,
   onMilestoneChange,
}: TMilestoneProps) => {
   return (
      <section className={clsx(s.wrapper, s[size], s[variant])}>
         {milestones.map((milestone, index) => (
            <Fragment key={index}>
               <div
                  className={clsx(
                     s.line,
                     ((activeMilestone && index <= activeMilestone) || completed) &&
                        s.done,
                  )}
               />

               <div
                  onClick={() => onMilestoneChange(index)}
                  className={clsx(
                     s.milestone,
                     index <= activeMilestone! && s.done,
                     index === activeMilestone && s.active,
                  )}
               >
                  {index < activeMilestone! && <CheckMarkIcon className={s.icon} />}

                  <div className={s.floatingLabel}>{milestone.label}</div>
               </div>
            </Fragment>
         ))}
      </section>
   );
};
