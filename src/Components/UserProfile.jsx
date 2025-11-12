import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import { getUsers } from "../api";

function UserProfile() {
const {username} = useParams();
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
            getUsers(username)
            .then((data) => {
                const foundUser = data.users.find((i) => i.username === username);
                setUser(foundUser)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching user:", error)
                setIsLoading(false);
            })
        }, [username])


    if(isLoading) return <p>Loading...</p>;
    if (!user) return <p>User not found</p>; 
    
    return (
    <>
    <div className="user-profile-card">
      <h2>{user.username}</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Avatar:</strong></p>
      <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
    </div>
        </>
    )
}

export default UserProfile;