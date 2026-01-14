import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./redux/store";
import { LoadingHandler } from "./components/Handler.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap App with Provider to pass the store */}
    <Provider store={store}>
      <PersistGate loading={<LoadingHandler />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
