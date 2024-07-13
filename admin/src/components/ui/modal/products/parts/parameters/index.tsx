'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';

import { IconedButton } from '@/components';
import { EParameterType } from '@/enums';
import { PlusIcon } from '@/icons';
import { RootState, updateCreationCard } from '@/store';

import { Parameter } from './parameter';

import s from './parameters.module.scss';

export const Parameters = () => {
   const dispatch = useDispatch();

   const t = useTranslations('Modal.Product');

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const handleAppendParameter = () => {
      dispatch(
         updateCreationCard({
            parameters: [
               ...creationCard.parameters,
               {
                  id: creationCard.parameters.length + 1,
                  label: '',
                  fieldType: EParameterType.INPUT,
                  extraPrice: 0,
               } as TProductParameter<TNullableParameter>,
            ],
         }),
      );
   };

   return (
      <section className={s.parameters}>
         <p className={s.title}>{t('parameter')}</p>

         <div className={s.parameterSection}>
            {creationCard.parameters.length > 0 &&
               creationCard.parameters.map(parameter => (
                  <Parameter
                     paramId={parameter.id}
                     parameters={creationCard.parameters}
                     key={parameter.id}
                  />
               ))}
         </div>

         <IconedButton
            icon={<PlusIcon />}
            onClick={handleAppendParameter}
            className={s.append}
            size="width-m"
            type="secondary"
         />
      </section>
   );
};

export * from './parameter';
