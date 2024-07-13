export const validateEmail = function (email?: string): TValidate {
   // eslint-disable-next-line no-useless-escape
   const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

   let validate: TValidate = {
      isValid: true,
      error: null,
   };

   if (validate.isValid && (email == null || email == '')) {
      validate = {
         isValid: false,
         // eslint-disable-next-line quotes
         error: "Email обов'язковий!",
      };
   }

   if (validate.isValid && !email?.match(emailRegex)) {
      validate = {
         isValid: false,
         error: 'Email введено невірно!',
      };
   }

   return validate;
};
