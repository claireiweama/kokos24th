import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import MainPage from "./pages/MainPage";
// import "./testSupabase"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<App />} /> 
            <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
