export const formatThousands = (value: number): string => {
   if (!value) return `${value}`;

   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
