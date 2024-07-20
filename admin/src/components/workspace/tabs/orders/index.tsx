'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components';
import { EDelivery, EPayment, EPaymentStatus, EStatus } from '@/enums';
import { createOrder, fetchOrders, fetchProducts, RootState } from '@/store';

import { TabLayout } from '../tab-layout';
import { OrdersCard } from './orders-card';

import s from './orders-tab.module.scss';

export const OrdersTab = () => {
   const dispatch = useDispatch();

   const { orders } = useSelector((state: RootState) => state.orders);
   const { products } = useSelector((state: RootState) => state.products);

   const t = useTranslations('Headers.Orders');

   useEffect(() => {
      dispatch(fetchProducts());
      dispatch(fetchOrders());
   }, []);

   return (
      <TabLayout title="Замовлення">
         <section className={s.content}>
            <div className={s.header}>
               <p className={s.orderNumber}>{t('orderNumber')}</p>
               <p className={s.orderDate}>{t('date')}</p>
               <p className={s.status}>{t('status')}</p>
               <p className={s.orderTotal}>{t('total')}</p>
               <p className={s.orderDelivery}>{t('delivery')}</p>
               <p className={s.orderAddress}>{t('address')}</p>
               <p className={s.orderPayment}>{t('payment')}</p>
            </div>

            <Button
               onClick={() => {
                  dispatch(
                     createOrder({
                        status: EStatus.NEW,
                        totalprice: 0,
                        createdat: new Date().toISOString(),
                        deliverytype: EDelivery.PICKUP,
                        address: 'Пушкинська 48',
                        paymenttype: EPayment.CARD,
                        contactphone: '099 632 22 55',
                        paymentstatus: EPaymentStatus.NOT_PAID,
                        filters: [
                           {
                              id: 'd8171941-f4f0-40b7-8642-19bc206d89ec',
                              filters: [
                                 {
                                    label: 'Вага',
                                    value: '1',
                                    extraprice: 0,
                                 },
                                 {
                                    label: 'Колір',
                                    value: '#381232',
                                    extraprice: 0,
                                 },
                              ],
                           },
                        ],
                        ordernumber: `${orders.length + 1}`,
                        name: 'Vladislav',
                        products: ['d8171941-f4f0-40b7-8642-19bc206d89ec'].map(id => {
                           return products.find(product => product.id === id) as TProduct;
                        }),
                        id: uuidv4(),
                     }),
                  );
               }}
            >
               Додати замовлення
            </Button>

            {orders &&
               orders.length > 0 &&
               orders.map(order => <OrdersCard key={order.id} id={order.id} />)}
         </section>
      </TabLayout>
   );
};
