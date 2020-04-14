import Snackbar from "react-native-snackbar";
import { Strings } from "../utils";
const showSnackbar = (title?: string) => {
  title === undefined ? (title = Strings.under_development) : null;
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_SHORT,
  });
};
export default showSnackbar;
