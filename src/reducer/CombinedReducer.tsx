import { combineReducers } from "redux";
import Home from "../modules/Home/reducer";
import Splash from "../modules/Splash/reducer";
import Register from "../modules/Auth/Register/reducer";
import Login from "../modules/Auth/Login/reducer";
import LandingPage from "../modules/Auth/LandingPage/reducer";
import SchoolListing from "../modules/Auth/FindSchool/SchoolListing/reducer";
import NearbySchool from "../modules/Auth/FindSchool/NearbySchool/reducer";
import ForgotPassword from "../modules/Auth/ForgotPassword/reducer";
const CombinedReducer = combineReducers({
  Home,
  Splash,
  Register,
  ForgotPassword,
  Login,
  LandingPage,
  SchoolListing,
  NearbySchool,
});

export default CombinedReducer;
