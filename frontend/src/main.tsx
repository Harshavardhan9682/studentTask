import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import { AuthProvider } from "./context/LoginContext";

const container = document.getElementById("root")!;
const container2 = document.getElementById("root2")!;
const root = createRoot(container);
// const root2 = createRoot(container2);

// const headEl = React.createElement("h1",{})

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
      {/* <AuthProvider> */}
          <App />  
      {/* </AuthProvider> */}
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

