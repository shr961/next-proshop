import validator from "validator";

const { isEmpty, isEmail } = validator;

export default function validate({ email, password }) {
  const errors = {};

  const emailIsValid = !isEmpty(email) && isEmail(email);

  const passwordIsValid = !isEmpty(password);

  const formIsValid = emailIsValid && passwordIsValid;

  if (!emailIsValid) {
    errors.email =
      "پست الکترونیک نامعتبر است. نمونه ی معتبر: samieehr961@gmail.com";
  }

  if (!passwordIsValid) {
    errors.password = "لطفا رمز عبور خود را وارد کنید.";
  }

  if (!formIsValid) {
    errors.form = true;
  }

  return errors;
}
