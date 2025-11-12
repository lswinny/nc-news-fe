import { useEffect, useState } from "react";
import "./App.css";
import"./New.css";
import { Routes, Route, data} from "react-router-dom";
import Header from "./Components/Header";
import LandingPage from "./Components/LandingPage";
import Articles from "./Components/Articles";
import ArticleSpecific from "./Components/ArticleSpecific";
import Users from "./Components/Users";
import { getUsers } from "./api";
import UserProfile from "./Components/UserProfile";

function App() {
  const [defaultUser, setDefaultUser] = useState(null);

  useEffect(() => {
    getUsers()
    .then((data) => {
      const users = data.users;
      const tickle122 = users.find((user) => user.username === "tickle122")
      if(tickle122) {
        setDefaultUser(tickle122 || users[0])}
      })
    .catch((error) => {
      console.error("Failed to fetch users:", error)
    })
  }, []);

  return (
    <>
      <Header />
      <main>
        <div></div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<ArticleSpecific username={defaultUser?.username}/>} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile/:username" element={<UserProfile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
