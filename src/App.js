import React from "react";
import Chat from "./pages/chat/Chat";
import { ToastContainer } from "react-toastify";
import MainPage from "./pages/mainPage/MainPage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark"/>
    </>
  );
};

export default App;
