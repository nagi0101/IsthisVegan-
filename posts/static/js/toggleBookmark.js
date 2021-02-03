const BOOKMARK_BTN = document.querySelector("#bookmark_btn");
const BOOKMARK_ICON = BOOKMARK_BTN.querySelector("i");
const BOOKMARK_URL = "/bookmark/";

const onBookmarkBtnClicked = (postPk) => {
  axios
    .post(BOOKMARK_URL, {
      postPk: postPk,
    })
    .then((response) => {
      const bookmarked = response.data;
      if (bookmarked) {
        BOOKMARK_ICON.classList.add("fas");
        BOOKMARK_ICON.classList.remove("far");
      } else {
        BOOKMARK_ICON.classList.add("far");
        BOOKMARK_ICON.classList.remove("fas");
      }
    });
};
