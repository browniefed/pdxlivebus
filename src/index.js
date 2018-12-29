import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/app";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers/index";

const store = createStore(reducers);

const AppProvider = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(AppProvider, document.getElementById("root"));
