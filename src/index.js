import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import App from "./components/App/App";
import "./index.css";
// import { config } from "dotenv";

// config();

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
