import { z } from 'zod';

enum ECategory {
   marshmallows = 1,
   bento_cakes = 2,
   cheesecakes = 3,
   tarts = 4,
   sweets = 5
}

const EZodCategory = z.enum(['marshmallows', 'bento_cakes', 'cheesecakes', 'tarts', 'sweets']);

export { EZodCategory, ECategory };
