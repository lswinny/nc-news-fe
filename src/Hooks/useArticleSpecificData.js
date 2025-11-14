import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticlesById, patchArticleVotes } from "../api";

function useArticleSpecificData() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  const [votes, setVotes] = useState(0);
  const[hasVotedUp, setHasVotedUp] = useState(false);
  const [hasVotedDown, setHasVotedDown] = useState(false);
  const [thanksMsg, setThanksMsg] = useState(false);

  useEffect(() => {
    getArticlesById(article_id).then((data) => {
      setArticle(data.article);
      setVotes(data.article.votes);
      setIsLoading(false);     
    })
  .catch((error) => {
   console.error("Error fetching article:", error);
   setError(error)
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
      setThanksMsg(true)
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
      setThanksMsg(true);
  })
      .catch((error) => {
        console.error("Vote failed:", error)
        setError(error)
        setArticle(null);
        setIsLoading(false);
      })
  };

  return {
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
  }
}
 
export default useArticleSpecificData;
