import { UUID } from 'crypto';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { Loader } from '@/components';
import { TOrderFilter } from '@/types/order';
import { capitalize } from '@/utils/capitalize';
import s from './card-product-section.module.scss';

type TProps = {
   name: string;
   productId: UUID;
   filters: TOrderFilter;
};

export const CardProductSection = ({ name, productId, filters }: TProps) => {
   const t = useTranslations('Headers.Orders');

   const [images] = useState<number>(0);
   const [loaded, setLoaded] = useState<boolean>(false);

   useEffect(() => {
      setLoaded(true);
   }, []);

   return (
      <div className={s.product}>
         {loaded ? (
            <>
               {images > 0 ? (
                  <div className={s.imageWrapper}>
                     <Image
                        src={`/images/${productId}/image-1.jpeg`}
                        alt="Product image"
                        width={225}
                        height={225}
                        objectFit="cover"
                     />
                  </div>
               ) : (
                  <div className={s.imagePlaceholder}></div>
               )}

               <section className={s.productInfo}>
                  <p>
                     <span>{t('call')}:</span> {capitalize(name)}
                  </p>

                  {filters.filters.map(({ label, value, extraprice }) => (
                     <p key={label}>
                        <span>{label}:</span> {value}
                        <span>+{extraprice}грн</span>
                     </p>
                  ))}
               </section>
            </>
         ) : (
            <Loader />
         )}
      </div>
   );
};
