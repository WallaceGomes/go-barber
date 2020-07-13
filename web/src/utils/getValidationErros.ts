import { ValidationError } from 'yup';

//interface que pode aceitar quaisquer dados do tipo string
//key pode-se entender como => name/password/email ; qualquer coisa
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  ///pega o path e a mensagem de todos os erros
  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
