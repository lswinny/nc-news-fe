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
    <section id="landing-buttons">
      <Link to="/articles">
        <button>View All Articles</button>
      </Link>
      <Link to="/topics">
        <button>View All Topics</button>
      </Link>
      <Link to="/users">
        <button>View All Users</button>
      </Link>
    </section>
    </>
  );
}

export default LandingPage;
