'use client';

import { useState } from 'react';

import { CreateProductModal } from '@/components';
import { PlusIcon } from '@/icons';

import s from './append-product-card.module.scss';

export const AppendProductCard = () => {
   const [modalOpened, setModalOpened] = useState<boolean>(false);

   const closeModal = () => setModalOpened(false);
   const openModal = () => setModalOpened(true);

   return (
      <>
         <div className={s.addProductCard} onClick={openModal}>
            <PlusIcon className={s.plusIcon} />
         </div>

         <CreateProductModal isOpened={modalOpened} onClose={closeModal} />
      </>
   );
};
