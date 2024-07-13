import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
   constructor(private schema: ZodObject<any>) {}

   transform(value: unknown) {
      try {
         this.schema.parse(value);
      } catch (err) {
         throw new BadRequestException(`Validation failed: ${err.message}`);
      }

      return value;
   }
}
