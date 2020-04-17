import { combineReducers } from "redux";
import Home from "../modules/Home/Reducer";
import Splash from "../modules/Splash/reducer";
import Register from "../modules/Auth/Register/reducer";
const reducer = combineReducers({
  Home,
  Splash,
  Register,
});

export default reducer;
