'use client';

import { UUID } from 'crypto';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import {
   Button,
   ImagesPreview,
   Loader,
   MilestoneTracker,
   Modal,
   Parameters,
   ProductInfo,
} from '@/components';

import { createCreationCard } from '@/store';

import s from './create-product.module.scss';

export const CreateProductModal = ({ isOpened, onClose }: TModalProps) => {
   const t = useTranslations();
   const dispatch = useDispatch();

   const [activeMilestone, setActiveMilestone] = useState<number>(0);
   const [loaded, setLoaded] = useState<boolean>(false);

   useEffect(() => {
      const id = crypto.randomUUID();

      dispatch(createCreationCard(id as UUID));

      setLoaded(true);
   }, []);

   const [stages] = useState<{ title: string; content: FC }[]>([
      {
         title: t('Modal.Product.Create.Stages.info'),
         content: ProductInfo,
      },
      {
         title: t('Modal.Product.Create.Stages.images'),
         content: ImagesPreview,
      },
      {
         title: t('Modal.Product.Create.Stages.parameters'),
         content: Parameters,
      },
   ]);
   const Stage = stages[activeMilestone].content;

   const onMilestoneChange = (index: number) => setActiveMilestone(index);

   return (
      <Modal isOpened={isOpened} onClose={onClose}>
         {loaded ? (
            <section className={s.wrapper}>
               <MilestoneTracker
                  activeMilestone={activeMilestone}
                  onMilestoneChange={onMilestoneChange}
                  milestones={stages.map(({ title }) => ({ label: title }))}
               />

               <Stage />

               <section className={s.buttons}>
                  <Button onClick={() => {}} variant="secondary">
                     {t('Modal.Product.Create.cancel')}
                  </Button>
                  <Button onClick={() => {}}>{t('Modal.Product.Create.create')}</Button>
               </section>
            </section>
         ) : (
            <Loader />
         )}
      </Modal>
   );
};
