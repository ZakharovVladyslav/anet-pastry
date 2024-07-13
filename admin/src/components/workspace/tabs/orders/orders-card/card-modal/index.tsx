import { useTranslations } from 'next-intl';

import { Modal } from '@/components';
import { TOrder } from '@/types/order';
import { formatDate } from '@/utils';

import { CardModalSection } from './card-modal-section';
import s from './card-modal.module.scss';
import { CardProductSection } from './card-product-section';

type TProps = {
   order: TOrder;
   isOpened: boolean;
   onClose: VoidFunction;
};

export const OrderCardModal = ({ order, isOpened, onClose }: TProps) => {
   const tHeaders = useTranslations('Headers.Orders');
   const tFields = useTranslations('Fields.Orders');

   return (
      <Modal isOpened={isOpened} onClose={onClose}>
         <section className={s.content}>
            <CardModalSection titleKey="info">
               <section className={s.info}>
                  <p>
                     <span>{tHeaders('name')}:</span> {order.name}
                  </p>
                  <p>
                     <span>{tHeaders('date')}:</span> {formatDate(order.createdat)}
                  </p>
                  <p>
                     <span>{tHeaders('phone')}:</span> {order.contactphone}
                  </p>
                  <p>
                     <span>{tHeaders('delivery')}:</span>{' '}
                     {tFields(`Delivery.${order.deliverytype}`)}
                  </p>
                  <p>
                     <span>{tHeaders('address')}:</span> {order.address}
                  </p>
                  <p>
                     <span>{tHeaders('total')}:</span> {order.totalprice}грн
                  </p>
                  <p>
                     <span>{tHeaders('payment')}:</span>{' '}
                     {tFields(`Payment.${order.paymenttype}`)}
                  </p>
                  <p>
                     <span>{tHeaders('paymentStatus')}:</span>{' '}
                     {tFields(`PaymentStatus.${order.paymentstatus}`)}
                  </p>
                  <p>
                     <span>{tHeaders('status')}:</span>{' '}
                     {tFields(`Status.${order.status}`)}
                  </p>
               </section>
            </CardModalSection>

            <CardModalSection titleKey="products">
               <section className={s.products}>
                  {order.products &&
                     order.products.length > 0 &&
                     order.products.map(product => (
                        <div key={product.id}>
                           {product && (
                              <CardProductSection
                                 filters={
                                    order.filters.find(
                                       filter => filter.id === product.id,
                                    )!
                                 }
                                 productId={product.id}
                                 name={product.name}
                                 key={product.id}
                              />
                           )}
                        </div>
                     ))}
               </section>
            </CardModalSection>
         </section>
      </Modal>
   );
};
