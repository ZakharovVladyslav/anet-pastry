import * as fs from 'fs';
import * as path from 'path';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductsEntity } from 'src/entities';
import { TCreateProductDto, TUpdateProductDto } from 'src/dto';
import { ECategory } from 'src/enums';

@Injectable()
export class ProductsService {
   constructor(
      @InjectRepository(ProductsEntity)
      private readonly productRepository: Repository<ProductsEntity>,
   ) {}

   async getProducts() {
      const products = await this.productRepository.find();

      if (!products) {
         throw new NotFoundException('Products not found');
      }

      const modifiedProducts = products.map(product => ({
         ...product,
         category: ECategory[product.category],
         allergens: JSON.parse(JSON.parse(product.allergens)),
         parameters: JSON.parse(JSON.parse(product.parameters)),
         imagesOrder: JSON.parse(JSON.parse(product.imagesOrder)),
      }));

      return modifiedProducts;
   }

   async getProductById(id: string) {
      const product = await this.productRepository.findOne({
         where: { id },
      });

      if (!product) {
         throw new NotFoundException('Product with this id is not found');
      }

      const modifiedProduct = {
         ...product,
         category: ECategory[product.category],
         allergens: JSON.parse(JSON.parse(product.allergens)),
         parameters: JSON.parse(JSON.parse(product.parameters)),
         imagesOrder: JSON.parse(JSON.parse(product.imagesOrder)),
      };

      return modifiedProduct;
   }

   async createProduct(
      productDto: TCreateProductDto & { images?: Express.Multer.File[] },
   ) {
      const id = crypto.randomUUID();
      const imagesFolderPath = path.join(
         __dirname,
         '..',
         '..',
         '..',
         'src',
         'images',
         id,
      );

      if (!fs.existsSync(imagesFolderPath)) {
         fs.mkdirSync(imagesFolderPath, { recursive: true });
      }

      productDto.images.map(image => {
         const imagePath = path.join(imagesFolderPath, image.originalname);

         fs.writeFileSync(imagePath, image.buffer);

         return imagePath;
      });

      const product = this.productRepository.create({
         name: productDto.name,
         description: productDto.description,
         dateCreated: new Date().toISOString(),
         category: ECategory[productDto.category],
         price: productDto.price,
         isActive: productDto.isActive,
         discount: productDto.discount,
         portionWeight: productDto.portionWeight,
         id,
         allergens: JSON.stringify(productDto.allergens),
         parameters: JSON.stringify(productDto.parameters),
         imagesOrder: JSON.stringify(productDto.imagesOrder),
      });

      await this.productRepository.save(product);
   }

   async updateProduct(
      id: string,
      productDto: TUpdateProductDto & { images: Express.Multer.File[] },
   ) {
      const { images, ...product } = productDto;

      const existingProduct = await this.productRepository.findOne({
         where: { id },
      });

      if (!existingProduct) {
         throw new NotFoundException('Product not found');
      }

      const imagesFolderPath = path.join(
         __dirname,
         '..',
         '..',
         '..',
         'src',
         'images',
         id,
      );

      if (!fs.existsSync(imagesFolderPath)) {
         fs.mkdirSync(imagesFolderPath, { recursive: true });
      } else {
         fs.readdir(imagesFolderPath, (err, files) => {
            if (err) {
               console.error('Error reading the directory', err);
               return;
            }

            files.forEach((file, index) => {
               const id = file.split('.')[0];
               const imagesOrder: string[] = JSON.parse(product.imagesOrder);

               if (!imagesOrder.includes(id)) {
                  fs.unlinkSync(path.join(imagesFolderPath, file));
               }
            });
         });
      }

      images.map(image => {
         const imagePath = path.join(imagesFolderPath, image.originalname);

         fs.writeFileSync(imagePath, image.buffer);

         return imagePath;
      });

      await this.productRepository.update(id, {
         ...product,
         category: ECategory[product.category],
         allergens: JSON.stringify(product.allergens),
         parameters: JSON.stringify(product.parameters),
         imagesOrder: JSON.stringify(product.imagesOrder),
      });
   }

   async deleteProduct(id: string) {
      const existingProduct = await this.productRepository.findOne({
         where: { id },
      });

      if (!existingProduct) {
         throw new NotFoundException('Product not found');
      }

      const imagesFolderPath = path.join(
         __dirname,
         '..',
         '..',
         '..',
         'src',
         'images',
         id,
      );

      if (fs.existsSync(imagesFolderPath)) {
         fs.rmdirSync(imagesFolderPath, {
            recursive: true,
         });
      }

      await this.productRepository.delete(id);
   }
}
