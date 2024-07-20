'use client';

import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { v4 as uuid } from 'uuid';

import { Button, Loader, Modal } from '@/components';
import { envs } from '@/config';
import {
   clearCreationCard,
   createCreationCard,
   createProduct,
   RootState,
   updateCreationCard,
   updateProduct,
} from '@/store';

import { Parameters, ImagesPreview, ProductInfo } from '../parts';

import s from './update-product.module.scss';

type TProps = {
   modalOpened: boolean;
   onClose: VoidFunction;
   productId?: UUID;
};

export const UpdateProductModal = ({ modalOpened, onClose, productId }: TProps) => {
   const dispatch = useDispatch();

   const { products } = useSelector((state: RootState) => state.products);
   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const t = useTranslations();

   const [id, setId] = useState<UUID>('' as UUID);
   const [loaded, setLoaded] = useState<boolean>(false);

   useEffect(() => {
      if (!modalOpened) return;

      dispatch(clearCreationCard());

      if (!productId) {
         // if productId is not provided then such product does not exist so we create a new product

         const newId = uuid();

         dispatch(createCreationCard(newId as UUID));

         setId(newId as UUID);
         setLoaded(true);
      } else {
         // if productId provided it means we are editing an existing product
         const product = products.find(product => product.id === productId);

         if (!product) {
            onClose();
            return;
         }

         const images: TProductImage[] = product.imagesOrder?.map(image => ({
            image: `${envs.NP_SERVER_URL}/images/${product.id}/${image}.png`,
            imageId: image,
         })) as TProductImage[];

         dispatch(updateCreationCard({ ...product, images }));

         setId(productId);
         setLoaded(true);
      }
   }, [modalOpened]);

   const handleSave = () => {
      productId
         ? dispatch(updateProduct(creationCard))
         : dispatch(createProduct({ ...creationCard, id }));

      onClose();

      // TODO remove all abnormal sizes for iconed button
   };

   return (
      <Modal isOpened={modalOpened} onClose={onClose} size="l">
         <>
            {loaded ? (
               <section className={s.contentWrapper}>
                  <section className={s.content}>
                     <ImagesPreview />

                     <ProductInfo />

                     <Parameters />
                  </section>

                  <div className={s.buttons}>
                     <Button onClick={onClose} variant="secondary" width="full">
                        {t('Modal.Product.cancel')}
                     </Button>

                     <Button onClick={handleSave} variant="primary" width="full">
                        {productId ? t('Modal.Product.save') : t('Modal.Product.create')}
                     </Button>
                  </div>
               </section>
            ) : (
               <Loader />
            )}
         </>
      </Modal>
   );
};
