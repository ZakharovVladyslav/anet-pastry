import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   UploadedFiles,
   UseGuards,
   UseInterceptors,
   UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
   TCreateProductDto,
   TUpdateOrderDto,
   TUpdateProductDto,
   createProductSchema,
   updateProductSchema,
} from '../../dto';
import { ApiKeyGuard } from '../../guards';
import { ZodValidationPipe } from 'src/pipes';
import { AnyFilesInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('products')
@UseGuards(ApiKeyGuard)
export class ProductsController {
   constructor(private productsService: ProductsService) {}

   @Get()
   getProducts() {
      return this.productsService.getProducts();
   }

   @Get(':id')
   getProductById(@Param('id') id?: string) {
      return this.productsService.getProductById(id);
   }

   @Post()
   @UseInterceptors(AnyFilesInterceptor())
   createProduct(
      @Body() product?: TCreateProductDto,
      @UploadedFiles() images?: Array<Express.Multer.File>,
   ) {
      return this.productsService.createProduct({ ...product, images });
   }

   @Patch(':id')
   @UseInterceptors(AnyFilesInterceptor())
   updateProduct(
      @Body() product: TUpdateProductDto,
      @Param('id') id: string,
      @UploadedFiles() images?: Array<Express.Multer.File>,
   ) {
      return this.productsService.updateProduct(id, { ...product, images });
   }

   @Delete(':id')
   deleteProduct(@Param('id') id: string) {
      return this.productsService.deleteProduct(id);
   }
}
