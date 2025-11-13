function getArticles(query = "") {
  return fetch(`https://nc-news-be-98uw.onrender.com/api/articles${query}`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: 'API: Failed to fetch articles',
        });
      }
      return res.json();
    }
  );
}

function getArticlesById(id){
    return fetch(`https://nc-news-be-98uw.onrender.com/api/articles/${id}`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: `Failed to fetch article ${id}`,
        });
      }
      return res.json();
    }
  );
}

function getCommentsByArticleId(id){
    return fetch(`https://nc-news-be-98uw.onrender.com/api/articles/${id}/comments`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: `Failed to fetch article ${id} comments`,
        });
      }
      return res.json();
    }
  );
}

function patchArticleVotes (article_id, voteChange) {
    return fetch(`https://nc-news-be-98uw.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({inc_votes: voteChange})
    }).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: `Failed to patch votes`,
        });
      }
      return res.json();
    }
  );
}

function getUsers(){
    return fetch(`https://nc-news-be-98uw.onrender.com/api/users`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: `Failed to fetch users`,
        });
      }
      return res.json();
    }
  );
}

function postComment (article_id, commentData) {
    return fetch(`https://nc-news-be-98uw.onrender.com/api/articles/${article_id}/comments`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(commentData)
    }).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject(res)
      }
      return res.json();
    });
}

function deleteComment (comment_id) {
  return fetch(`https://nc-news-be-98uw.onrender.com/api/comments/${comment_id}`, {
      method: "DELETE",
    }).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: `Failed to delete comment`,
        });
      }
    }
  );
}

function getTopics () {
    return fetch(`https://nc-news-be-98uw.onrender.com/api/topics`).then(
    (res) => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          msg: `Failed to fetch topics`,
        });
      }
      return res.json();
    }
  );
}

export {getArticles, getArticlesById, getCommentsByArticleId, patchArticleVotes, getUsers, postComment, deleteComment, getTopics}
