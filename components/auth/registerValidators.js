import { digitsEnToFa } from "@persian-tools/persian-tools";
import validator from "validator";

const {
  isEmpty,
  isEmail,
  isAlphanumeric,
  equals,
  isLength,
  isAlpha,
  isStrongPassword,
} = validator;

export default function validate({ email, password, name, confirmPassword }) {
  const errors = {};

  const nameIsValid =
    !isEmpty(name) &&
    (isAlpha(name) || isAlpha(name, "fa-IR")) &&
    isLength(name, { min: 3, max: 16 });

  const emailIsValid = !isEmpty(email) && isEmail(email);

  const passwordIsValid =
    !isEmpty(password) && isStrongPassword(password, { minSymbols: 0 });

  const confirmPasswordIsValid = equals(confirmPassword, password);

  const formIsValid =
    nameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;

  if (!nameIsValid) {
    errors.name = `نام باید شامل فقط حروف فارسی یا انگلیسی، حداقل ${digitsEnToFa(
      3
    )} و حداکثر ${digitsEnToFa(20)} کارکتر باشد.`;
  }

  if (!emailIsValid) {
    errors.email =
      "پست الکترونیک نامعتبر است. نمونه ی معتبر: samieehr961@gmail.com";
  }

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
