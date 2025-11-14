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
        if (!foundUser){
          throw new Error("User not found.")
        }
        setUser(foundUser);
        setIsLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching user: ", error);
        }
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
