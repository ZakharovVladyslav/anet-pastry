'use client';

import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from '@/components';
import { RootState, updateCreationCard } from '@/store';

import s from './input.module.scss';

type TProps = {
   paramId: UUID;
};

export const InputParameter = ({ paramId }: TProps) => {
   const dispatch = useDispatch();

   const t = useTranslations();

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const [additionalInfo, setAdditionalInfo] = useState<TInputParameter>(
      {} as TInputParameter,
   );

   useEffect(() => {
      const parameter = creationCard.parameters.find(
         param => param.id === paramId,
      ) as TProductParameter<TInputParameter>;

      if (!parameter) return;

      setAdditionalInfo(parameter.additionalInfo);
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
      setAdditionalInfo({
         ...additionalInfo,
         defaultValue: e.target.value,
      });
   };

   const handleInputUnit = (e: ChangeEvent<HTMLInputElement>) => {
      setAdditionalInfo({
         ...additionalInfo,
         unit: e.target.value,
      });
   };

   return (
      <div className={s.inputParameterWrapper}>
         <Input
            placeholder={t('Modal.Product.Parameter.Input.defaultValue')}
            label={t('Modal.Product.Parameter.Input.defaultValue')}
            value={additionalInfo?.defaultValue ?? ''}
            onChange={handleInputDefaultValue}
         />

         <Input
            placeholder={t('Modal.Product.Parameter.Input.unit')}
            label={t('Modal.Product.Parameter.Input.unit')}
            value={additionalInfo?.unit ?? ''}
            onChange={handleInputUnit}
            optional
         />
      </div>
   );
};
