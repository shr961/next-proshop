import { digitsEnToFa } from "@persian-tools/persian-tools";
import validator from "validator";

const { isEmpty, equals, isStrongPassword } = validator;

export default function validate({ password, confirmPassword }) {
  const errors = {};

  const passwordIsValid =
    !isEmpty(password) && isStrongPassword(password, { minSymbols: 0 });

  const confirmPasswordIsValid = equals(confirmPassword, password);

  const formIsValid = passwordIsValid && confirmPasswordIsValid;

  if (!passwordIsValid) {
    errors.password = `رمز عبور باید شامل ترکیبی از اعداد و حروف انگلیسی بزرگ و کوچک و حداقل ${digitsEnToFa(
      8
    )} کارکتر باشد.`;
  }

  if (!confirmPasswordIsValid) {
    errors.confirmPassword = "رمز عبور و تکرار آن باید بکسان باشند.";
  }

  if (!formIsValid) {
    errors.form = true;
  }

  return errors;
}
