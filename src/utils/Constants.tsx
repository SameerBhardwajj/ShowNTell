// Validations ----------------------

const reg = (regex: string) => {
  switch (regex) {
    case "email":
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    case "password":
      return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    case "phone":
      return /^[1-9]{1}[0-9]{6,14}$/;
    case "name":
      return /^[a-zA-Z ]+$/;
    case "zipcode":
      return /(^[1-9]{1}\d{3,6}$)/;
  }
};

const validate = (type: string, text: string) => {
  const regex: any = reg(type);
  if (type === "name") return regex.test(String(text).toLowerCase());
  else return regex.test(String(text));
};

export { validate };
