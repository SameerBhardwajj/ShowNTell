// Validations ----------------------

const reg = (regex: string) => {
  switch (regex) {
    case "email":
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    case "password":
      return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    case "phone":
      return /^\+[0-9]{3}[1-9]{1}[0-9]{9}$/;
    case "name":
      return /^[a-zA-Z ]+$/;
    case "zipcode":
      return /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  }
};

const validate = (type: string, text: string) => {
  const regex: any = reg(type);
  return regex.test(String(text).toLowerCase());
};

export { validate };
