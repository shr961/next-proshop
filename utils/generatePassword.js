const keys = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%&~?/-=",
};

const getKey = [
  function upperCase() {
    return keys.upperCase[Math.floor(Math.random() * keys.upperCase.length)];
  },
  function lowerCase() {
    return keys.lowerCase[Math.floor(Math.random() * keys.lowerCase.length)];
  },
  function number() {
    return keys.numbers[Math.floor(Math.random() * keys.numbers.length)];
  },
  function symbol() {
    return keys.symbols[Math.floor(Math.random() * keys.symbols.length)];
  },
];

const generatePassword = (passwordLength = 16) => {
  let password = "";

  while (passwordLength > password.length) {
    const key = getKey[Math.floor(Math.random() * getKey.length)];
    password += key();
  }

  return password;
};

export default generatePassword;
