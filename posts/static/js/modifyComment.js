const COMMENTS_CONTAINER = document.querySelector(".comments_container");

const modifyComment = (data) => {
  const old_ul = COMMENTS_CONTAINER.querySelector("ul");
  const ul = document.createElement("ul");
  data.forEach((comment) => {
    const li = document.createElement("li");
    const user = document.createElement("h4");
    const content = document.createElement("p");
    const commentBtnContainer = document.createElement("div");
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
    commentBtnContainer.className = "comment_btns_container";

    // onclick
    likeBtn.onclick = (event) => onCommentLikeBtnClicked(comment.id);

    // 로그인 된 유저와의 연관 처리
    if (comment.liked) {
      likeIcon.classList.add("fas");
    } else {
      likeIcon.classList.add("far");
    }

    // DOM 구성
    likeBtn.append(likeIcon, likeCount);
    commentBtnContainer.append(likeBtn);

    if (comment.written_by_user) {
      const deleteBtn = document.createElement("button");
      const deleteIcon = document.createElement("i");
      const deleteText = document.createElement("span");
      deleteBtn.className = "comment_delete_btn";
      deleteIcon.className = "fas fa-trash-alt";
      deleteText.innerText = "삭제";
      deleteBtn.append(deleteIcon, deleteText);
      deleteBtn.onclick = (event) => onCommentDeleteBtnClicked(comment.id);
      commentBtnContainer.append(deleteBtn);
    }

    li.append(user, content, commentBtnContainer);
    ul.append(li);
  });
  COMMENTS_CONTAINER.replaceChild(ul, old_ul);
};
