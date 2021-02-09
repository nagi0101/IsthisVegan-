const POST_PER_PAGE = 50;
const FIRST_POST_ID = document.querySelector(".post_grid-li").firstElementChild
  .dataset.postId;
const LOCAL_CONTAINER = document.querySelector(".local_container");
const POSTS_URL = "/posts/";
// const POSTS_URL = "{% url 'post_list' %}";
let fetching = false;
let page = 1;
let maxPage = 1;

const modifyPost = (data, mode) => {
  let posts_container = document.querySelector(".post_grid-ul");
  const newUl = document.createElement("ul");
  data.forEach((post) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const title = document.createElement("span");
    const user = document.createElement("span");
    const like_container = document.createElement("span");
    const like_count = document.createElement("span");
    const like_icon = document.createElement("i");
    const date = document.createElement("span");

    // 내부에 들어가는 text 설정
    title.innerText = post.title;
    user.innerText = post.nickname;
    like_count.innerText = post.liked_total;
    date.innerText = post.date;

    // class, id, dataSet, link 등 설정
    li.className = "post_grid-li";
    a.href = `/detail/${post.id}?category=${category}`;
    a.className = "post_grid-a";
    a.dataset.postId = post.postId;
    title.className = "post_title";
    user.className = "post_user";
    like_container.className = "post_like";
    like_icon.className = "fas fa-heart";
    date.className = "post_date";

    // DOM 구성
    like_container.append(like_icon, like_count);
    a.append(title, user, like_container, date);
    li.append(a);

    // RatedPost 처리
    if (category === "VISIT" || category === "BUY") {
      const post_rate = document.createElement("span");
      post_rate.innerText = post.rate;
      post_rate.className = "post_rate";
      a.insertBefore(post_rate, date);
    }

    // append
    if (mode === "add") {
      posts_container.append(li);
    } else if (mode === "replace") {
      newUl.append(li);
    }
  });
  if (mode === "replace") {
    newUl.className = "post_grid-ul";
    newUl.addEventListener("scroll", handleScroll);
    posts_container.parentElement.replaceChild(newUl, posts_container);
  }
};

const sendAxiosRequest = (mode) => {
  axios
    .post(POSTS_URL, {
      page: page,
      category: category,
      FIRST_POST_ID: FIRST_POST_ID,
      POST_PER_PAGE: POST_PER_PAGE,
    })
    .then(function (response) {
      data = response.data;
      // 업데이트 할 데이터가 없을 경우 함수를 탈출한다.
      if (!data.length) {
        console.log(page, "no data!");
        return;
      }
      modifyPost(data, mode);
      page++;
      try {
        rateToStar();
      } catch (error) {}
    })
    .catch(function (error) {
      console.log(error);
    });
};

const fetchMorePosts = async () => {
  fetching = true;
  sendAxiosRequest("add");
  fetching = false;
};

const handleScroll = (event) => {
  const target = event.target;
  const scrollHeight = target.scrollHeight;
  const scrollTop = target.scrollTop;
  const clientHeight = target.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
    fetchMorePosts();
  }
};

const onClickPaginationNode = function (pageClicked) {
  page = pageClicked;
  fetching = true;
  sendAxiosRequest("replace");
  window.scrollTo(0, 0);
  fetching = false;
};

const createPagination = () => {
  const paginationContainer = document.createElement("div");
  for (let index = 0; index < maxPage; index++) {
    const paginationNode = document.createElement("div");
    paginationNode.innerText = index + 1;
    paginationNode.style.cursor = "pointer";
    paginationNode.style.border = "1px solid #eeeeee";
    paginationNode.onclick = (event) => onClickPaginationNode(index);
    paginationContainer.append(paginationNode);
  }
  paginationContainer.style.position = "fixed";
  paginationContainer.style.right = "20px";
  paginationContainer.style.top = "20px";
  LOCAL_CONTAINER.append(paginationContainer);
};

const initPage = () => {
  const maxPageStr = document.querySelector("#max-page").innerText;
  maxPage = Number(maxPageStr);
  createPagination();
};

initPage();

document
  .querySelector(".post_grid-ul")
  .addEventListener("scroll", handleScroll);
