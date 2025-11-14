import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUsers } from "../api";

function useUserProfileData() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers(username)
      .then((data) => {
        const foundUser = data.users.find((i) => i.username === username);
        setUser(foundUser);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError(error);
        setIsLoading(false);
      });
  }, [username]);

  return {
    user,
    isLoading,
    error,
  };
}

export default useUserProfileData;
