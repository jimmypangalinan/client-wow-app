import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// api
import App from "./App";

// useContext
import { UserContextTokenProvider } from "./context/useContext";
import { UserContextModalProvider } from "./context/useContextModal";

ReactDOM.render(
  <React.StrictMode>
    <UserContextModalProvider>
      <UserContextTokenProvider>
        <Router>
          <App />
        </Router>
      </UserContextTokenProvider>
    </UserContextModalProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
