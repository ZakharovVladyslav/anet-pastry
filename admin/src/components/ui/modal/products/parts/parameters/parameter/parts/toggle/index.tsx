'use client';

import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';

import { Toggle } from '@/components';
import { RootState, updateCreationCard } from '@/store';

import s from './Toggle.module.scss';

type TProps = {
   paramId: UUID;
};

export const ToggleParameter = ({ paramId }: TProps) => {
   const t = useTranslations();

   const dispatch = useDispatch();

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const [param, setParam] =
      useState<Nullable<TProductParameter<TToggleParameter>>>(null);

   useEffect(() => {
      const parameter = creationCard.parameters.find(param => param.id === paramId);

      if (!parameter) return;

      setParam(parameter);
   }, []);

   const handleToggle = () => {
      const targetIndex = creationCard.parameters.findIndex(
         param => param.id === paramId,
      );

      const updatedParameters = [...creationCard.parameters];

      updatedParameters[targetIndex] = {
         ...updatedParameters[targetIndex],
         additionalInfo: {
            ...updatedParameters[targetIndex].additionalInfo,
            defaultChecked: !param?.additionalInfo?.defaultChecked,
         },
      } as TProductParameter<TToggleParameter>;

      dispatch(updateCreationCard({ parameters: updatedParameters }));
      setParam(updatedParameters[targetIndex]);
   };

   return (
      <div className={s.toggleParameterWrapper}>
         <p className={s.title}>{t('Modal.Product.Parameter.Toggle.title')}:</p>

         <Toggle
            checked={param?.additionalInfo?.defaultChecked as boolean}
            onChange={handleToggle}
         />
      </div>
   );
};
