// Validations ----------------------
import ConstantName from "./ConstantName";
const reg = (regex: string) => {
  switch (regex) {
    case ConstantName.EMAIL:
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    case ConstantName.PASSWORD:
      return /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d@#?!$%^&*-]{8,15}$/;
    case ConstantName.PHONE:
      return /^[0-9]{7,15}$/;
    case ConstantName.NAME:
      return /^[a-zA-Z ]+$/;
    case ConstantName.ZIPCODE:
      return /(^\d{5,7}$)/;
  }
};

const validate = (type: string, text: string) => {
  const regex: any = reg(type);
  if (type === ConstantName.NAME) return regex.test(String(text).toLowerCase());
  else if (type === ConstantName.PHONE)
    return regex.test(text.replace(/\D+/g, ""));
  else return regex.test(String(text));
};

export { validate };
