import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/MainPage" element={<MainPage />} />
    </Routes>
  );
}

export default App;