const COMMENT_CREATE_URL = "/commentcreate/";
const COMMENT_TEXTAREA = document.querySelector(
  ".comment_create_area textarea"
);

const onCommentCreateBtnClicked = (postPk, category) => {
  const content = COMMENT_TEXTAREA.value;
  if (!content) {
    return;
  }

  axios
    .post(COMMENT_CREATE_URL, {
      postPk: postPk,
      content: content,
      category: category,
    })
    .then((response) => {
      const data = response.data;
      modifyComment(data);
      COMMENT_TEXTAREA.value = "";
    });
};
