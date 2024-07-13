type TProductImage = {
   image: string;
   imageId: string;
};

type TProduct = {
   id: UUID;
   name: string;
   description: string;
   dateCreated: string;
   category: ECategory;
   isActive: boolean;
   price: number;
   discount?: number;
   allergens: EAllergens[];
   parameters: TProductParameter[];
   portionSize: number;
   portionWeight: number;
   images?: TProductImage[];
   imagesOrder?: string[];
};

type TUpdateProduct = {
   id?: UUID;
   name?: string;
   description?: string;
   dateCreated?: string;
   category?: ECategory;
   isActive?: boolean;
   price?: number;
   discount?: number;
   allergens?: EAllergens[];
   parameters?: TProductFilter[];
   portionWeight?: number;
   images?: TProductImage[];
   imagesOrder?: string[];
};
