type TTab = {
   panel: FC;
   acceptedRoles: ERole[];
};

type TShopTabSection = {
   tabs: {
      [`${EShopTab}`]: TTab;
   };
};

type TSystemTabSection = {
   tabs: {
      [`${ESystemTab}`]: TTab;
   };
};

type TTabs = {
   shop: TShopTabSection;
   system: TSystemTabSection;
};
