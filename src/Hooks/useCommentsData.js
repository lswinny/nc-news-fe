import { useEffect, useState } from "react";
import { getCommentsByArticleId, postComment, deleteComment } from "../api";

function useCommentsData({ article_id, username }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [isLoadingPosting, setIsLoadingPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (newCommentBody) {
      setFormError(null);
    }
  }, [newCommentBody]);

  useEffect(() => {
    getCommentsByArticleId(article_id)
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching comments: ", error);
        }
        setFormError(error);
        setComments(null);
        setIsLoading(false);
      });
  }, [article_id]);

  const handlePostComment = (event) => {
    event.preventDefault();
    if (newCommentBody.length < 2) {
      setFormError("Comment must be at least 2 characters.");
      return;
    }
    setIsLoadingPosting(true);
    setFormError(null);

    postComment(article_id, {
      author: username,
      body: newCommentBody.trim(),
    })
      .then(() => {
        return getCommentsByArticleId(article_id);
      })
      .then(({ comments }) => {
        setComments(comments);
        setNewCommentBody("");
        setIsLoadingPosting(false);
      })
      .catch((error) => {
        console.error("Unable to post comment:", error);
        setFormError("Failed to post comment. Please try again.");
        setIsLoadingPosting(false);
      });
  };

  const handleDeleteComment = (comment_id) => {
    setIsDeleting(true);
    setFormError(null);
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setIsDeleting(false);
      })
      .catch((error) => {
        console.error("Unable to delete comment:", error);
        setFormError("Failed to delete comment. Please try again.");
        setIsDeleting(false);
      });
  };

  return {
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
  };
}
export default useCommentsData;
