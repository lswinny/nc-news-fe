import { useState } from "react";
import "./App.css";
import"./New.css";
import { Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import LandingPage from "./Components/LandingPage";
import Articles from "./Components/Articles";
import ArticleSpecific from "./Components/ArticleSpecific";

function App() {

  return (
    <>
      <Header />
      <main>
        <div></div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<ArticleSpecific />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
