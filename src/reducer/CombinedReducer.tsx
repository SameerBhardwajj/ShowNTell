import { combineReducers } from "redux";
import Home from "../modules/Home/reducer";
import Splash from "../modules/Splash/reducer";
import Register from "../modules/Auth/Register/reducer";
import PhotoLibrary from '../modules/PhotoLibrary/reducer';
const reducer = combineReducers({
  Home,
  Splash,
  Register,
  PhotoLibrary,
});

export default reducer;
