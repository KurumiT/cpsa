import * as React from "react";
import { View } from "react-native";
import { BrowserRouter } from "react-router-dom";
import Store from "./src/utils/Store";
import "bootstrap/dist/css/bootstrap.css";
import "./public/style/style.css";
import { Provider } from "react-redux";
import Page from "./src/containers/Page";

export default function App() {
  return (
    <Provider store={Store.create()}>
      <View>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </View>
    </Provider>
  );
}
