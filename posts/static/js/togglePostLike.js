const POST_LIKE_BTN = document.querySelector("#post_like_btn");
const POST_LIKE_ICON = POST_LIKE_BTN.querySelector("i");
const POST_LIKE_COUNT = document.querySelector("#post_like_count");
const POST_LIKE_URL = "/postlike/";

const onPostLikeBtnClicked = (postPk) => {
  axios
    .post(POST_LIKE_URL, {
      postPk: postPk,
    })
    .then((response) => {
      const data = response.data;
      const liked = data.liked;
      const likedTotal = data.likedTotal;
      if (liked) {
        POST_LIKE_ICON.classList.add("fas");
        POST_LIKE_ICON.classList.remove("far");
      } else {
        POST_LIKE_ICON.classList.add("far");
        POST_LIKE_ICON.classList.remove("fas");
      }
      POST_LIKE_COUNT.innerText = likedTotal;
    });
};
