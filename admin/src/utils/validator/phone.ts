type TProps = {
   text: string;
   minLength?: number;
   maxLength?: number;
   canBeEmpty?: boolean;
}

const validateText = function ({
   text,
   minLength,
   maxLength,
   canBeEmpty = false,
}: TProps): TValidate {
   let validate: TValidate = {
      isValid: true,
      error: null,
   };

   if (validate.isValid && text.length === 0 && !canBeEmpty) {
      validate = {
         isValid: false,
         error: 'empty',
      };
   }

   if (validate.isValid && minLength && text.length < minLength) {
      validate = {
         isValid: false,
         error: 'short',
      };
   }

   if (validate.isValid && maxLength && text.length > maxLength) {
      validate = {
         isValid: false,
         error: 'long',
      };
   }

   return validate;
};

export default validateText;
