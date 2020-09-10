import { combineReducers } from "redux";
import Home from "../modules/Home/reducer";
import Splash from "../modules/Splash/reducer";
import Register from "../modules/Auth/Register/reducer";
import PhotoLibrary from "../modules/PhotoLibrary/reducer";
import Login from "../modules/Auth/Login/reducer";
import LandingPage from "../modules/Auth/LandingPage/reducer";
import SchoolListing from "../modules/Auth/FindSchool/SchoolListing/reducer";
import NearbySchool from "../modules/Auth/FindSchool/NearbySchool/reducer";
import ForgotPassword from "../modules/Auth/ForgotPassword/reducer";
import Attendance from "../modules/Attendance/reducer";
import Announcement from "../modules/Announcement/reducer";
import QOTD from "../modules/QOD/reducer";
import Profile from "../modules/Profile/reducer";
import ClassroomSchedule from "../modules/ClassroomSchedule/reducer";
import Chat from "../modules/Chat/reducer";
import Statements from "../modules/Statements/reducer";
import Notification from "../modules/Notification/reducer";
import Absence from "../modules/Absence/reducer";
import Settings from "../modules/Settings/reducer";
import Testimonials from "../modules/Testimonials/reducer";
import Events from "../modules/Events/reducer";
const CombinedReducer = combineReducers({
  Home,
  Splash,
  Register,
  PhotoLibrary,
  ForgotPassword,
  Login,
  LandingPage,
  SchoolListing,
  NearbySchool,
  Attendance,
  Announcement,
  QOTD,
  Profile,
  ClassroomSchedule,
  Chat,
  Statements,
  Notification,
  Absence,
  Settings,
  Testimonials,
  Events,
});

const rootReducer = (state: any, action: any) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGGED_OUT") {
    const { Login, NearbySchool } = state;

    state = { Login, NearbySchool };
  }

  return CombinedReducer(state, action);
};

export default rootReducer;
