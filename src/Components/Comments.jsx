import { useEffect, useState } from "react";
import { getCommentsByArticleId, postComment, deleteComment, getUsers } from "../api";

function Comments({article_id, username}) {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [newCommentBody, setNewCommentBody] = useState("")

  useEffect(() => {
  getCommentsByArticleId(article_id).then((data) => {
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
    postComment(article_id, {
      author: username,
      body: newCommentBody,
    })
    .then((newComment) => {
      setComments((prevComments) => [newComment, ...prevComments]);
      setNewCommentBody("")})
      .catch((error) => {
        console.error("Unable to post comment:", error)
      })
  };

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
    .then(() => {
      setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id))})
      .catch((error) => {
        console.error("Unable to delete comment:", error)
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
            ></input>
            <button type="submit">Post</button>
        </form>
        {comments.map((comment) => ( 
          <div className="single-comment-card" key={comment.comment_id}>
          <h3>{comment.author}</h3>
          <p>{new Date(comment.created_at).toLocaleString()}</p>
          <p>{comment.body}</p>
          {comment.author === username && (
          <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
          )}
          <p>Votes: {comment.votes}</p>
          </div>
        ))}
      </div>
      </>
  );
}
 
export default Comments;
