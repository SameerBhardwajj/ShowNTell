/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";

import Router from "./src/router";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/Store";
import { PersistGate } from "redux-persist/es/integration/react";
import { Client } from "bugsnag-react-native";
const bugsnag = new Client("47e6d22f2dfac66b9e275ed81ba909a8");
bugsnag.notify(new Error("Test error"));

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
