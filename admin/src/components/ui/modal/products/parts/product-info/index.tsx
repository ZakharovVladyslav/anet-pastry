'use client';

import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input, Select, Textarea } from '@/components';
import { categoriesTranslationKeys, allergens } from '@/const';
import { ECategory, EAllergens } from '@/enums';
import { RootState, updateCreationCard } from '@/store';
import { acceptDigitsOnly } from '@/utils';

import s from './product-info.module.scss';

export const ProductInfo = () => {
   const t = useTranslations();
   const tCategory = useTranslations('Category');
   const tAllergen = useTranslations('Allergens');
   const dispatch = useDispatch();

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const id = creationCard.id;

   const handleChangeProductName = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(updateCreationCard({ id, name: e.target.value }));
   };

   const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
      const formattedInput = acceptDigitsOnly(e.target.value);
      dispatch(updateCreationCard({ id, price: +formattedInput }));
   };

   const handleChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
      let formattedInput = acceptDigitsOnly(e.target.value);

      if (+formattedInput > 100) {
         formattedInput = '100';
      }

      dispatch(updateCreationCard({ id, discount: +formattedInput }));
   };

   const handleSetCategory = (value: string | string[]) => {
      dispatch(updateCreationCard({ id, category: value as ECategory }));
   };

   const handleInputPortionWeight = (e: ChangeEvent<HTMLInputElement>) => {
      const formattedInput = acceptDigitsOnly(e.target.value);
      dispatch(updateCreationCard({ id, portionWeight: +formattedInput }));
   };

   const handleSetAllergens = (value: string | string[]) => {
      dispatch(updateCreationCard({ id, allergens: value as EAllergens[] }));
   };

   const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(updateCreationCard({ id, description: e.target.value }));
   };

   return (
      <section className={s.mainInfo}>
         <Input
            label={t('Modal.Product.productName')}
            value={creationCard.name ?? ''}
            placeholder={t('Modal.Product.productName')}
            onChange={handleChangeProductName}
         />

         <Input
            label={t('Modal.Product.price')}
            placeholder="0₴"
            value={creationCard.price ? `${creationCard.price}₴` : ''}
            onChange={handleChangePrice}
         />

         <Input
            label={t('Modal.Product.discount')}
            placeholder="0%"
            value={`${creationCard.discount} %`}
            onChange={handleChangeDiscount}
            optional
         />

         <Select
            label={t('Modal.Product.category')}
            options={categoriesTranslationKeys.map(key => {
               return { key, label: tCategory(key) };
            })}
            onChange={handleSetCategory}
            value={
               creationCard.category
                  ? tCategory(creationCard.category)
                  : t('Modal.Product.category')
            }
            internalValue={creationCard.category}
            placeholder={t('Modal.Product.category')}
            style={{ zIndex: 110 }}
            size="full"
         />

         <Input
            label={t('Modal.Product.portionWeight')}
            placeholder="0"
            value={`${creationCard.portionWeight ?? '0'}`}
            onChange={handleInputPortionWeight}
            optional
         />

         <Select
            label={t('Modal.Product.allergens')}
            options={allergens.map(allergen => {
               return { key: allergen, label: tAllergen(allergen) };
            })}
            onChange={handleSetAllergens}
            value={creationCard.allergens.map(allergen => tAllergen(allergen)) ?? []}
            internalValue={creationCard.allergens}
            placeholder={t('Modal.Product.allergens')}
            style={{ zIndex: 100 }}
            size="full"
            multiple
         />

         <Textarea
            label={t('Modal.Product.description')}
            value={creationCard.description ?? ''}
            placeholder={t('Modal.Product.description')}
            onChange={handleChangeDescription}
         />
      </section>
   );
};
