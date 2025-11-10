import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    setIsLoading(false)
}, [])



  if (isLoading) return <p>Loading... </p>;

  return (
    <>
      <h2>Landing Page welcomes you!</h2>
      <Link to="/articles">
        <button>View All Articles</button>
      </Link>
    </>
  );
}

export default LandingPage;
