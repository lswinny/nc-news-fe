import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users: ", error);
        setUsers(null);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading... </p>;
  if (!users) return <p>Something went wrong loading users.</p>;

  return (
    <>
    <h2 className="page-headers">Users</h2>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card-all" key={user.username}>
            <div>
              <h3>Username: {user.username}</h3>
              <img src={user.avatar_url} alt={user.username} />
              <Link to={`/profile/${user.username}`}>
                <button className="profile-button">View Profile</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Users;
