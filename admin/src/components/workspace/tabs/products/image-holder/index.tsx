'use client';

import Image from 'next/image';
import { useState } from 'react';

import { IconedButton } from '@/components';
import { TrashIcon } from '@/icons';

import s from './image-holder.module.scss';

type TProps = {
   image: string;
   removeImage?: VoidFunction;
};

export const ImageHolder = ({ image, removeImage = () => {} }: TProps) => {
   const [overlayShown, setOverlayShown] = useState<boolean>(false);

   const handleShowOverlay = () => setOverlayShown(true);
   const handleHideOverlay = () => setOverlayShown(false);

   return (
      <div
         className={s.imageWrapper}
         onMouseEnter={handleShowOverlay}
         onMouseLeave={handleHideOverlay}
      >
         <Image
            src={image}
            alt="Product image"
            width={192}
            height={192}
            objectFit="cover"
         />
         <div className={s.overlay} style={{ opacity: overlayShown ? '1' : '0' }}>
            <IconedButton
               onClick={removeImage}
               size="xl"
               icon={<TrashIcon className={s.icon} />}
            />
         </div>
      </div>
   );
};
