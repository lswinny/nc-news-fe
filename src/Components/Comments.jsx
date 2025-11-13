import { useEffect, useState } from "react";
import { getCommentsByArticleId, postComment, deleteComment, getUsers } from "../api";

function Comments({article_id, username}) {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentBody, setNewCommentBody] = useState("")
  const [isLoadingPosting, setIsLoadingPosting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if(newCommentBody) {
      setError(null);
    }
  }, [newCommentBody])

  useEffect(() => {
  getCommentsByArticleId(article_id)
  .then((data) => {
    setComments(data.comments);
    setIsLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching comments:");
    setComments(null);
    setIsLoading(false);
  })
}, [article_id])

const handlePostComment = (event) => {
    event.preventDefault();
    if(newCommentBody.length <2){
      setError("Comment must be at least 2 characters.")
      return;
    }
    setIsLoadingPosting(true);
    setError(null);

    postComment(article_id, {
      author: username,
      body: newCommentBody.trim(),
    })
    .then(() => {
      return getCommentsByArticleId(article_id)
    })
    .then(({comments}) => {
      setComments(comments);
      setNewCommentBody("");
      setIsLoadingPosting(false)
  })
      .catch((error) => {
        console.error("Unable to post comment:", error);
        setError("Failed to post comment. Please try again.")
        setIsLoadingPosting(false);
      })
  };

  const handleDeleteComment = (comment_id) => {
    setIsDeleting(true);
    setError(null);
    deleteComment(comment_id)
    .then(() => {
      setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id))
      setIsDeleting(false)
       })
      .catch((error) => {
        console.error("Unable to delete comment:", error)
        setError("Failed to delete comment. Please try again.")
        setIsDeleting(false);
      })
  };
  

  if ( isLoading) return <p>Loading comments...</p>;
  
  return (
    <>
      <div id="article-specific-comments">
        <h3> ____Comments____</h3>
        <form onSubmit={handlePostComment}>
            <p>Commenting as <strong>{username}</strong></p>
            <label htmlFor="newComment">Post new comment: </label>
            <input
            id="newComment"
            type="text"
            value={newCommentBody}
            onChange={(event) => {setNewCommentBody(event.target.value)}}
            disabled={isLoadingPosting}
            ></input>
            <button type="submit" disabled={isLoadingPosting}>{isLoadingPosting ? "Posting..." : "Post Comment"}</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        {comments.map((comment) => ( 
          <div className="single-comment-card" key={comment.comment_id}>
          <h3>{comment.author}</h3>
          <p>{new Date(comment.created_at).toLocaleString()}</p>
          <p>{comment.body}</p>
          {comment.author === username && (
          <button onClick={() => handleDeleteComment(comment.comment_id)} disabled={isDeleting}>{isDeleting ? "Deleting..." : "Delete"}</button>
          )}
          <p>Votes: {comment.votes}</p>
          </div>
        ))}
      </div>
      </>
  );
}
 
export default Comments;
