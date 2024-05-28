import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import "./i18n";
import { store } from "@/global/store"
import { Provider } from "react-redux"

// import * as serviceWorker from './serviceWorker';
  ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
  <BrowserRouter basename="/purple">
    <App />
  </BrowserRouter>
</Provider>
  );

// serviceWorker.unregister();