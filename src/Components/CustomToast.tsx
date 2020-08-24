import Snackbar from "react-native-snackbar";
import { Strings } from "../utils";
const CustomToast = (title?: string) => {
  title === undefined ? (title = Strings.under_development) : null;
  setTimeout(() => {
    Snackbar.dismiss();
  }, 5000);
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_INDEFINITE,
  });
};
export default CustomToast;
