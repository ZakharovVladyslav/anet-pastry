export const validatePassword = function (password?: string): TValidate {
   let validate: TValidate = {
      isValid: true,
      error: null,
   };

   if (validate.isValid && (password == null || password == '')) {
      validate = {
         isValid: false,
         // eslint-disable-next-line quotes
         error: "Пароль обов'язковий!",
      };
   }

   if (validate.isValid && password!.length < 3) {
      validate = {
         isValid: false,
         error: 'Пароль надто короткий!',
      };
   }

   return validate;
};
