// Validations ----------------------
const validateEmail = (data: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(data).toLowerCase());
};

const validatePasssword = (password: string) => {
  var rp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return rp.test(String(password));
};

const validatePhone = (phone: string) => {
  var rp = /^\+[0-9]{3} [1-9]{1}[0-9]{9}$/;
  return rp.test(String(phone));
};

export { validateEmail, validatePasssword, validatePhone };
