'use client';

import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@/components';
import { RootState, updateCreationCard } from '@/store';
import { acceptDigitsOnly } from '@/utils';

import s from './Counter.module.scss';

type TProps = {
   paramId: UUID;
};

export const CounterParameter = ({ paramId }: TProps) => {
   const dispatch = useDispatch();

   const t = useTranslations();

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const [additionalInfo, setAdditionalInfo] = useState<TCounterParameter>({
      step: 1,
      defaultValue: 0,
   } as TCounterParameter);

   useEffect(() => {
      const parameter = creationCard.parameters.find(
         param => param.id === paramId,
      ) as TProductParameter<TCounterParameter>;

      if (!parameter) return;

      setAdditionalInfo({
         ...parameter.additionalInfo,
         defaultValue: parameter.additionalInfo?.defaultValue ?? 0,
         step: parameter.additionalInfo?.step ?? 1,
      });
   }, []);

   useEffect(() => {
      const targetIndex = creationCard.parameters.findIndex(
         param => param.id === paramId,
      );

      const updatedParameters = [...creationCard.parameters];

      updatedParameters[targetIndex] = {
         ...updatedParameters[targetIndex],
         additionalInfo,
      } as TProductParameter<TInputParameter>;

      dispatch(updateCreationCard({ parameters: updatedParameters }));
   }, [additionalInfo]);

   const handleInputDefaultValue = (e: ChangeEvent<HTMLInputElement>) => {
      const value = +acceptDigitsOnly(e.target.value);

      setAdditionalInfo({
         ...additionalInfo,
         defaultValue: value,
      });
   };

   const handleInputStep = (e: ChangeEvent<HTMLInputElement>) => {
      const value = +acceptDigitsOnly(e.target.value);

      setAdditionalInfo({
         ...additionalInfo,
         step: value,
      });
   };

   const handleInputUnit = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setAdditionalInfo({
         ...additionalInfo,
         unit: value,
      });
   };

   return (
      <div className={s.counterParameterWrapper}>
         <Input
            label={t('Modal.Product.Parameter.Counter.defaultValue')}
            placeholder={t('Modal.Product.Parameter.Counter.defaultValue')}
            value={`${additionalInfo?.defaultValue}`}
            onChange={handleInputDefaultValue}
         />
         <Input
            label={t('Modal.Product.Parameter.Counter.step')}
            placeholder={t('Modal.Product.Parameter.Counter.step')}
            value={`${additionalInfo?.step}`}
            onChange={handleInputStep}
         />
         <Input
            label={t('Modal.Product.Parameter.Counter.unit')}
            placeholder={t('Modal.Product.Parameter.Counter.unit')}
            value={additionalInfo?.unit ?? ''}
            onChange={handleInputUnit}
         />
      </div>
   );
};
