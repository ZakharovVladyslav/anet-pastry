import { OrdersTab } from '@/components/workspace/tabs';
import { ProductsTab } from '@/components/workspace/tabs/products';
import { ERole, EShopTab, ESystemTab } from '@/enums';

export const tabs: TTabs = {
   shop: {
      tabs: {
         orders: {
            panel: OrdersTab,
            acceptedRoles: [ERole.ADMIN, ERole.MODERATOR],
         },
         products: {
            panel: 'Products',
            acceptedRoles: [ERole.ADMIN, ERole.MODERATOR],
         },
         statistics: {
            panel: 'Statistics',
            acceptedRoles: [ERole.ADMIN, ERole.ACCOUNTANT, ERole.ANALYST],
         },
      },
   },
   system: {
      tabs: {
         users: {
            panel: 'Users',
            acceptedRoles: [ERole.ADMIN],
         },
         admins: {
            panel: 'Admins',
            acceptedRoles: [ERole.ADMIN],
         },
         settings: {
            panel: 'Settings',
            acceptedRoles: [
               ERole.ADMIN,
               ERole.MODERATOR,
               ERole.ACCOUNTANT,
               ERole.ANALYST,
            ],
         },
      },
   },
};

export const allowedTabs = {
   admin: {
      shop: [EShopTab.ORDERS, EShopTab.PRODUCTS, EShopTab.STATISTICS],
      system: [ESystemTab.USERS, ESystemTab.ADMINS, ESystemTab.SETTINGS],
   },
   moderator: {
      shop: [EShopTab.ORDERS, EShopTab.PRODUCTS],
      system: [ESystemTab.SETTINGS],
   },
   accountant: {
      shop: [EShopTab.STATISTICS],
      system: [ESystemTab.SETTINGS],
   },
   analyst: {
      shop: [EShopTab.STATISTICS],
      system: [ESystemTab.SETTINGS],
   },
};

export const panelByAllowedTab = {
   [EShopTab.ORDERS]: OrdersTab,
   [EShopTab.PRODUCTS]: ProductsTab,
   [EShopTab.STATISTICS]: ProductsTab,
   [ESystemTab.USERS]: ProductsTab,
   [ESystemTab.ADMINS]: ProductsTab,
   [ESystemTab.SETTINGS]: ProductsTab,
};
