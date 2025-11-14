import useArticleSpecificData from "../Hooks/useArticleSpecificData";
import Comments from "./Comments";
import {Link} from "react-router-dom";

function ArticleSpecific({username}) {
  const {
    article_id,
    article,
    isLoading,
    error,
    votes,
    handleVoteUp,
    handleVoteDown,
    hasVotedUp,
    hasVotedDown,
    thanksMsg
  } = useArticleSpecificData();
  
  if (error) {return (<><p>{error.message || "Article not found."}</p><Link to="/articles">Back to articles</Link></>)}
  if (isLoading) return <p>Loading...</p>;
  
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
        {thanksMsg && <p> Thanks for your vote!</p>}
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
