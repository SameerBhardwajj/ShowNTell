// Validations ----------------------
import ConstantName from "./ConstantName";
const reg = (regex: string) => {
  switch (regex) {
    case ConstantName.EMAIL:
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    case ConstantName.PASSWORD:
      // return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return /^[0-9a-zA-Z]{4,12}$/;
    case ConstantName.PHONE:
      return /^[1-9]{1}[0-9]{6,14}$/;
    case ConstantName.NAME:
      return /^[a-zA-Z ]+$/;
    case ConstantName.ZIPCODE:
      return /(^[1-9]{1}\d{3,6}$)/;
  }
};

const validate = (type: string, text: string) => {
  const regex: any = reg(type);
  if (type === ConstantName.NAME) return regex.test(String(text).toLowerCase());
  else return regex.test(String(text));
};

export { validate };