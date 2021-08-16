import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./pages/App/App";
import UserContext from "./contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContext>
        <App />
      </UserContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
