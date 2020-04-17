import { combineReducers } from "redux";
import Home from "../modules/Home/Reducer";
import Splash from "../modules/Splash/reducer";
const reducer = combineReducers({
  Home,
  Splash,
});

export default reducer;
