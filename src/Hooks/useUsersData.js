import { useEffect, useState } from "react";
import { getUsers } from "../api";

function useUsersData() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching users: ", error);
        }
        setError(error);
        setUsers(null);
        setIsLoading(false);
      });
  }, []);

  return {
    users,
    isLoading,
    error,
  };
}

export default useUsersData;
