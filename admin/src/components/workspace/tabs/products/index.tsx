'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';

import { fetchProducts, RootState } from '@/store';
import { TabLayout } from '../tab-layout';
import { AppendProductCard } from './append-product-card';
import { ProductCard } from './product-card';

import s from './products-tab.module.scss';

export const ProductsTab = () => {
   const dispatch = useDispatch();

   const t = useTranslations('Sidebar.Tabs');

   const { products } = useSelector((state: RootState) => state.products);

   const [updatedProducts, setUpdatedProducts] = useState<TProduct[]>([]);

   useEffect(() => {
      setUpdatedProducts(products);
   }, [products]);

   useEffect(() => {
      dispatch(fetchProducts());
   }, []);

   return (
      <TabLayout title={t('products')}>
         <section className={s.cards}>
            <AppendProductCard />

            {updatedProducts.length > 0 &&
               updatedProducts.map(product => (
                  <ProductCard key={product.id} productId={product.id} />
               ))}
         </section>
      </TabLayout>
   );
};

export * from './append-product-card';
export * from './image-holder';
export * from './product-card';
