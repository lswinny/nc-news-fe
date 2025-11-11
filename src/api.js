function getArticles() {
  console.log("Getting all articles");

  return fetch(`https://nc-news-be-98uw.onrender.com/api/articles`).then(
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

export {getArticles, getArticlesById, getCommentsByArticleId, patchArticleVotes}
