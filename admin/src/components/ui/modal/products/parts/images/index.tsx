'use client';

import { ChangeEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FilePicker, ImageHolder } from '@/components';

import { RootState, updateCreationCard } from '@/store';
import s from './images.module.scss';

export const ImagesPreview = () => {
   const dispatch = useDispatch();

   const { creationCard } = useSelector((state: RootState) => state.creationCard);

   const handlePickImage = (e: ChangeEvent<HTMLInputElement>) => {
      const targetFile = e.target.files?.[0];

      if (!targetFile) return;

      const id = crypto.randomUUID();

      const renamedFile = new File([targetFile], `${id}.png`, { type: 'image/png' });

      const targetImageURL = URL.createObjectURL(renamedFile);

      const images: TProductImage[] = [
         ...(creationCard.images || []),
         {
            image: targetImageURL,
            imageId: id,
         },
      ];
      const imagesOrder = [...(creationCard.imagesOrder || []), id];

      dispatch(
         updateCreationCard({
            images,
            imagesOrder,
         }),
      );
   };

   const handleRemoveImage = (imageId: string) => {
      const images = creationCard.images?.filter(image => image.imageId !== imageId);
      const imagesOrder = creationCard.imagesOrder?.filter(id => id !== imageId);

      dispatch(
         updateCreationCard({
            images,
            imagesOrder,
         }),
      );
   };

   return (
      <section className={s.outterWrapper}>
         <section className={s.wrapper}>
            <FilePicker onChange={handlePickImage} />

            {creationCard.images?.map((image, index) => (
               <ImageHolder
                  key={index}
                  image={image.image}
                  removeImage={() => handleRemoveImage(image.imageId)}
               />
            ))}
         </section>
      </section>
   );
};
