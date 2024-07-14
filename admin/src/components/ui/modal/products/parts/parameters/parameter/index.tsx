'use client';

import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ColorParameter, IconedButton, Input, Select } from '@/components';
import { EParameterType } from '@/enums';
import { TrashIcon } from '@/icons';
import { RootState, updateCreationCard } from '@/store';
import { acceptDigitsOnly } from '@/utils';

import s from './parameter.module.scss';

import { CounterParameter, ToggleParameter, InputParameter } from './parts';

type TProps = {
   paramId: UUID;
   parameters: TProductParameter<TNullableParameter>[];
};

type TParameterProps = {
   paramId: UUID;
};

const parameterComponents: Record<EParameterType, FC<TParameterProps>> = {
   [EParameterType.COLOR]: ColorParameter,
   [EParameterType.COUNTER]: CounterParameter,
   [EParameterType.TOGGLE]: ToggleParameter,
   [EParameterType.INPUT]: InputParameter,
};

export const Parameter = ({ paramId, parameters }: TProps) => {
   const dispatch = useDispatch();

   const t = useTranslations();
   const tParameter = useTranslations('ParameterType');

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const [params, setParams] = useState<TProductParameter<TNullableParameter>>(
      creationCard.parameters.find(param => param.id === paramId) ??
         ({} as TProductParameter<TNullableParameter>),
   );

   const ParameterComponent = params
      ? parameterComponents[params.fieldType as EParameterType]
      : null;

   useEffect(() => {
      if (params.extraPrice?.toString().length === 1) {
         const priceField = document.querySelector('#price-field') as HTMLInputElement;
         priceField.innerHTML = '';
      }
   }, [params.extraPrice]);

   useEffect(() => {
      const targetParamsIndex = parameters.findIndex(param => param.id === paramId);

      if (targetParamsIndex === -1) return;

      const updatedParameters = [...parameters];

      updatedParameters[targetParamsIndex] = params;

      dispatch(updateCreationCard({ parameters: [...updatedParameters] }));
   }, [params]);

   const handleInputProductName = (e: ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, label: e.target.value });
   };

   const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
      const formattedInput = acceptDigitsOnly(e.target.value);
      setParams({ ...params, extraPrice: +formattedInput });
   };

   const handleSelectFilterType = (value: string | string[]) => {
      setParams({ ...params, fieldType: value as EParameterType });
   };

   const removeParameter = () => {
      const targetParameterIndex = parameters.findIndex(param => param.id === paramId);

      if (targetParameterIndex === -1) return;

      const updatedParameters = [...parameters];

      updatedParameters.splice(targetParameterIndex, 1);

      dispatch(updateCreationCard({ parameters: [...updatedParameters] }));
   };

   return (
      <div className={s.parameterWrapper}>
         <div className={s.innerWrapper}>
            <Input
               label={t('Modal.Product.Parameter.parameterName')}
               value={params.label ?? ''}
               placeholder={t('Modal.Product.Parameter.parameterName')}
               onChange={handleInputProductName}
            />

            <IconedButton
               icon={<TrashIcon />}
               type="primary"
               aspect="square-m"
               size="l"
               onClick={removeParameter}
            />
         </div>

         <div className={s.innerWrapper}>
            <Select
               label={t('Modal.Product.Parameter.parameterType')}
               onChange={handleSelectFilterType}
               options={[
                  EParameterType.COLOR,
                  EParameterType.COUNTER,
                  EParameterType.INPUT,
                  EParameterType.TOGGLE,
               ].map(type => ({ key: type, label: tParameter(type) }))}
               value={tParameter(params.fieldType)}
               internalValue={params.fieldType}
               selectorLabel={t('Modal.Product.Parameter.parameterType')}
               placeholder={t('Modal.Product.Parameter.parameterType')}
               size="full"
               style={{ zIndex: 10 }}
            />

            <Input
               label={t('Modal.Product.Parameter.price')}
               id="price-field"
               value={params.extraPrice ? `${params.extraPrice}₴` : ''}
               placeholder={'0₴'}
               onChange={handleInputPrice}
               optional
            />
         </div>

         {ParameterComponent && <ParameterComponent paramId={paramId} />}
      </div>
   );
};

export * from './parts/color';
