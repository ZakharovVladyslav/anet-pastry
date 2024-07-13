type TProps = {
   text: string;
   maxLength?: number;
   minLength?: number;
};

export const validateText = ({ text, maxLength, minLength }: TProps): TValidate => {
   const validateOpts: TValidate = {
      isValid: true,
      error: null,
   };

   if (!text || text.length === 0) {
      return {
         isValid: false,
         error: 'Field is required',
      };
   }

   if (maxLength && text.length > maxLength) {
      return {
         isValid: false,
         error: `Max length is ${maxLength}`,
      };
   }

   if (minLength && text.length < minLength) {
      return {
         isValid: false,
         error: `Min length is ${minLength}`,
      };
   }

   return validateOpts;
};
