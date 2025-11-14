import useUserProfileData from "../Hooks/useUserProfileData";

function UserProfile() {
const {
    user,
    isLoading,
    error,
  } = useUserProfileData();

    if (error) return <p>Error loading: {error.message}</p>;  
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