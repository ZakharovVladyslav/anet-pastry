export const capitalize = (str: string) => {
   if (!str) return str;

   if (str.length === 1) return str.toUpperCase();

   return str.charAt(0).toUpperCase() + str.slice(1);
}
