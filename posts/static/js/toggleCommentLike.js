const COMMENT_LIKE_URL = "/commentlike/";

const onCommentLikeBtnClicked = (commentPk) => {
  const COMMENT = document.querySelector(`#comment-${commentPk}`);
  const COMMENT_LIKE_BTN = COMMENT.querySelector(".comment_like_btn");
  const COMMENT_LIKE_ICON = COMMENT_LIKE_BTN.querySelector("i");
  const COMMENT_LIKE_COUNT = COMMENT.querySelector(".comment_like_count");
  axios
    .post(COMMENT_LIKE_URL, {
      commentPk: commentPk,
    })
    .then((response) => {
      const data = response.data;
      const liked = data.liked;
      const likedTotal = data.likedTotal;
      if (liked) {
        COMMENT_LIKE_ICON.classList.add("fas");
        COMMENT_LIKE_ICON.classList.remove("far");
      } else {
        COMMENT_LIKE_ICON.classList.add("far");
        COMMENT_LIKE_ICON.classList.remove("fas");
      }
      COMMENT_LIKE_COUNT.innerText = likedTotal;
    });
};
