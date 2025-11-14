import useCommentsData from "../Hooks/useCommentsData";

function Comments({article_id, username}) {

  const {
    comments,
    isLoading,
    fetchError,
    formError,
    newCommentBody,
    setNewCommentBody,
    isLoadingPosting,
    isDeleting,
    handlePostComment,
    handleDeleteComment,
  } = useCommentsData({article_id, username});

  if (fetchError) return <p>Error loading: {fetchError.message || fetchError}</p>;
  if (isLoading) return <p>Loading comments...</p>;
  if (!comments) return <p>No comments found.</p>;
  
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
            {formError && <p style={{ color: "red" }}>{formError}</p>}
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
