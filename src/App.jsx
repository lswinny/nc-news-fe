import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import LandingPage from "./Components/LandingPage";
import Articles from "./Components/Articles";

function App() {
  const [count, setCount] = useState(0);


  return (
    <>
      <Header />
      <main>
        <div></div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<Articles />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
