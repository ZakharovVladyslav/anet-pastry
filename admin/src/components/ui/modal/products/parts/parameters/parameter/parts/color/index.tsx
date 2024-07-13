'use client';

import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button, ColorParameterModal } from '@/components';

type TProps = {
   paramId: UUID;
};

export const ColorParameter = ({ paramId }: TProps) => {
   const t = useTranslations();

   const [colorModalOpened, setColorModalOpened] = useState<boolean>(false);

   const openColorModal = () => setColorModalOpened(true);
   const closeColorModal = () => setColorModalOpened(false);

   return (
      <>
         <Button variant="primary" size="m" width="full" onClick={openColorModal}>
            {t('Modal.Product.Parameter.Color.configure')}
         </Button>

         <ColorParameterModal
            paramId={paramId}
            isOpened={colorModalOpened}
            onClose={closeColorModal}
         />
      </>
   );
};
