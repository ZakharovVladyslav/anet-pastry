import { UUID } from 'crypto';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { RootState } from '@/store';
import { TOrder } from '@/types/order';
import { formatThousands } from '@/utils';
import { formatDate } from '@/utils/formatter/date';
import { OrderCardModal } from './card-modal';

import s from './orders-card.module.scss';

type TProps = {
   id: UUID;
};

export const OrdersCard = ({ id }: TProps) => {
   const { orders } = useSelector((state: RootState) => state.orders);
   const t = useTranslations('Fields.Orders');

   const [order, setOrder] = useState<Nullable<TOrder>>(null);
   const [modalOpened, setModalOpened] = useState<boolean>(false);

   useEffect(() => {
      setOrder(orders.find(order => order.id === id) || null);
   }, []);

   return (
      <>
         {order && (
            <>
               <div className={s.orderCard} onClick={() => setModalOpened(true)}>
                  <p className={s.orderNumber}>#{order?.ordernumber}</p>
                  <p className={s.orderDate}>{formatDate(order?.createdat as string)}</p>
                  <p className={s.status}>{t(`Status.${order?.status}`)}</p>
                  <p className={s.orderTotal}>
                     {formatThousands(order?.totalprice as number)}&#8372;
                  </p>
                  <p className={s.orderDelivery}>
                     {t(`Delivery.${order?.deliverytype}`)}
                  </p>
                  <p className={s.orderAddress}>{order?.address}</p>
                  <p className={s.orderPayment}>{t(`Payment.${order?.paymenttype}`)}</p>
               </div>
               <OrderCardModal
                  isOpened={modalOpened}
                  onClose={() => setModalOpened(false)}
                  order={order!}
               />
            </>
         )}
      </>
   );
};
