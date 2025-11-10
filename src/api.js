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
  console.log("Getting Articles By ID ", id, typeof id);

    return fetch(`/api/articles/${id}`).then(
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

export {getArticles, getArticlesById}
