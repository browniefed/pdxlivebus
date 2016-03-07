import React from "react";
import { render } from "react-dom";
import "./polyfill";

import App from "./containers/app";
render(<App />, document.getElementById('root'));
