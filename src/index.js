import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatContextProvider } from "./context/ChatContext";
import Theme from "./theme/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Theme>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </Theme>
);
