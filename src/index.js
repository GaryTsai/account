import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RootRouter from "./router";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux"; 
import store from "./../src/store"; 

ReactDOM.render(
    <Provider store={store}>
      <RootRouter />
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
