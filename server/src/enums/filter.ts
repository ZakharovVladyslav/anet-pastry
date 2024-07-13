import { z } from 'zod';

enum EFilterType {
   input = 1,
   color = 2,
   counter = 3,
   toggle = 4
}

const EZodFilterType = z.enum(['input', 'color', 'counter', 'toggle']);

export { EZodFilterType, EFilterType };
