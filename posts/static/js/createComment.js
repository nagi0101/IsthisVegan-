const COMMENT_CREATE_URL = "/commentcreate/";
const COMMENT_TEXTAREA = document.querySelector(
  ".comment_create_area textarea"
);
const COMMENTS_CONTAINER = document.querySelector(".comments_container");
const COMMENT_UL = COMMENTS_CONTAINER.querySelector("ul");

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
      console.log(data);
      const ul = document.createElement("ul");
      data.forEach((comment) => {
        const li = document.createElement("li");
        const user = document.createElement("h4");
        const content = document.createElement("p");
        const likeBtn = document.createElement("button");
        const likeIcon = document.createElement("i");
        const likeCount = document.createElement("span");

        // 내부에 들어가는 텍스트 설정
        user.innerText = comment.nickname;
        content.innerText = comment.content;
        likeCount.innerText = comment.liked_total;

        // class, id 설정
        li.id = `comment-${comment.id}`;
        likeBtn.className = "comment_like_btn";
        likeIcon.className = "fa-heart";
        likeCount.className = "comment_like_count";

        // onclick
        likeBtn.onclick = (event) => onCommentLikeBtnClicked(comment.id);

        // DOM 구성
        likeBtn.append(likeIcon);
        li.append(user, content, likeBtn, likeCount);

        // 로그인 된 유저와의 연관 처리
        if (comment.liked) {
          likeIcon.classList.add("fas");
        } else {
          likeIcon.classList.add("far");
        }

        if (comment.written_by_user) {
          const deleteBtn = document.createElement("button");
          const deleteIcon = document.createElement("i");
          const deleteText = document.createElement("span");
          deleteIcon.className = "fas fa-trash-alt";
          deleteText.innerText = "삭제";
          deleteBtn.append(deleteIcon, deleteText);
          li.append(deleteBtn);
        }

        ul.append(li);
      });
      COMMENTS_CONTAINER.replaceChild(ul, COMMENT_UL);
      COMMENT_TEXTAREA.value = "";
    });
};
