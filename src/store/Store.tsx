import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import CombinedReducer from "../reducer/CombinedReducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Login", "NearbySchool"],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, CombinedReducer);
const enhancer = compose(applyMiddleware(thunk));
const store = createStore(persistedReducer, enhancer);
let persistor = persistStore(store);

export { store, persistor };
