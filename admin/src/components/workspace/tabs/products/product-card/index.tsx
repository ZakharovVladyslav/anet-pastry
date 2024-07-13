'use client';

import { UUID } from 'crypto';
import cn from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';

import { Button, IconedButton, UpdateProductModal } from '@/components';
import { RootState, updateProduct, deleteProduct } from '@/store';

import s from './product-card.module.scss';

type TProps = {
   productId: UUID;
};

export const ProductCard = ({ productId }: TProps) => {
   const dispatch = useDispatch();

   const tCategory = useTranslations('Category');
   const tCard = useTranslations('Product.Card');

   const { products } = useSelector((state: RootState) => state.products);

   const [product, setProduct] = useState<Nullable<TProduct>>(null);
   const [images] = useState<Nullable<string[]>>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const cardRef = useRef<Nullable<HTMLDivElement>>(null);

   const imagesExist = images?.length && images.length > 0;

   useEffect(() => {
      const targetProduct = products.find(product => product.id === productId);

      if (!targetProduct) return;

      setProduct(targetProduct);
   }, []);

   useEffect(() => {
      if (!products) return;

      const targetProduct = products.find(product => product.id === productId);

      if (!targetProduct) return;

      setProduct(targetProduct);
   }, [products]);

   const closeModal = () => setIsModalOpen(false);
   const openModal = () => setIsModalOpen(true);

   const toggleActivate = () => {
      dispatch(updateProduct({ ...(product as TProduct), isActive: !product?.isActive }));
   };

   const removeCard = () => {
      const card = cardRef.current;

      if (card) {
         card.style.transform = 'scale(0)';

         setTimeout(() => {
            dispatch(deleteProduct(productId as UUID));
         }, 300);
      } else {
         dispatch(deleteProduct(productId as UUID));
      }
   };

   return (
      <>
         <div
            className={cn(s.productCard, {
               [s.disActive]: !product?.isActive,
            })}
            ref={cardRef}
         >
            {imagesExist ? (
               images.map((image, index) => (
                  <IconedButton
                     key={index}
                     onClick={openModal}
                     aspect="square"
                     size="width-full"
                     icon={
                        <Image
                           src={image}
                           alt="Product image"
                           width={250}
                           height={250}
                           onClick={openModal}
                        />
                     }
                  />
               ))
            ) : (
               <IconedButton
                  onClick={openModal}
                  aspect="square"
                  size="width-full"
                  icon={<div className={s.imagePlaceholder} />}
               />
            )}

            <div className={s.content}>
               <h1 className={s.name}>
                  {product?.name ? product.name : tCard('noName')}
               </h1>

               <div className={s.row}>
                  <p className={s.category}>
                     {product?.category
                        ? tCategory(product?.category)
                        : tCard('noCategory')}
                  </p>
                  <h2 className={s.price}>{product?.price ?? 0}&#8372;</h2>
               </div>
            </div>

            <div className={s.buttons}>
               <Button onClick={toggleActivate} variant="primary" size="s" width="full">
                  {product?.isActive ? tCard('deactivate') : tCard('activate')}
               </Button>
               <Button onClick={removeCard} variant="secondary" size="s" width="full">
                  {tCard('delete')}
               </Button>
            </div>
         </div>

         <UpdateProductModal
            modalOpened={isModalOpen}
            onClose={closeModal}
            productId={product?.id}
         />
      </>
   );
};
