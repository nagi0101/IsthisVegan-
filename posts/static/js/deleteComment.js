const COMMENT_DELETE_URL = "/commentdelete/";

const onCommentDeleteBtnClicked = (commentPk) => {
  axios
    .post(COMMENT_DELETE_URL, {
      commentPk: commentPk,
    })
    .then((response) => {
      // 요청한 유저가 댓글의 작성자가 아닌 경우 함수를 빠져나간다
      if (!response.data) {
        console.log("wrong access!");
        return;
      }
      const data = response.data;
      modifyComment(data);
    });
};
