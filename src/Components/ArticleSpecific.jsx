import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesById, getCommentsByArticleId, patchArticleVotes } from "../api";
import Comments from "./Comments";

function ArticleSpecific({username}) {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const[hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);
  

  useEffect(() => {
    getArticlesById(article_id).then((data) => {
      setArticle(data.article);
      setVotes(data.article.votes);
      setIsLoading(false);     
    })
  .catch((error) => {
   console.error("Error fetching article:", error);
   setArticle(null);
   setIsLoading (false);
  })
}, [article_id])

  const handleVoteUp = () => {
    if(hasVotedUp || hasVotedDown) return;
    patchArticleVotes(article_id, 1)
    .then((data) => {
      setVotes(data.article.votes)
      setHasVotedUp(true)
  })
      .catch((error) => {
        console.error("Vote failed:", error)
      })
  };

  const handleVoteDown = () => {
    if(hasVotedUp || hasVotedDown) return;
    patchArticleVotes(article_id, -1)
    .then((data) => {
      setVotes(data.article.votes)
      setHasVotedDown(true)
  })
      .catch((error) => {
        console.error("Vote failed:", error)
      })
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;
  
  return (
    <><h2>{article.title}</h2>
    <section className="article-specific-layout">
      <div id="article-specific-card" key={article.article_id}>
        <img src={article.article_img_url} alt={article.title} />
        <h3 className="all-p-tags">
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Comments: {article.comment_count}</p>
        <p>{new Date(article.created_at).toLocaleString()}</p>
        <p>Votes: {votes}</p> 
        <button onClick={handleVoteUp} disabled={hasVotedUp || hasVotedDown}>👍</button>
        <button onClick={handleVoteDown} disabled={hasVotedUp || hasVotedDown}>👎</button>
        </h3>
        <div className="article-body">
          <p>{article.body}</p>
        </div>
        </div> 
      <Comments article_id={article_id} username={username} />
      </section>
      </>
  );
}
 
export default ArticleSpecific;
