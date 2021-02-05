const POST_PER_PAGE = 50;
const FIRST_POST_ID = document.querySelector(".posts").firstElementChild.dataset
  .postId;
const POSTS_CONTAINER = document.querySelector(".posts");
const POSTS_URL = "/posts/";
// const POSTS_URL = "{% url 'post_list' %}";
let fetching = false;
let page = 1;

const modifyPost = (data) => {
  data.forEach((post) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const title = document.createElement("span");
    const user = document.createElement("span");
    const like_container = document.createElement("span");
    const like_count = document.createElement("span");
    const like_icon = document.createElement("i");

    // 내부에 들어가는 text 설정
    title.innerText = post.title;
    user.innerText = post.nickname;
    like_count.innerText = post.liked_total;

    // class, id, dataSet, link 등 설정
    li.dataset.postId = post.postId;
    li.className = "post";
    like_icon.className = "fas fa-heart";
    a.href = `/detail/${post.id}?category=${category}`;

    // DOM 구성
    like_container.append(like_icon, like_count);
    a.append(title, user, like_container);
    li.append(a);

    // RatedPost 처리
    if (category === "VISIT" || category === "BUY") {
      const post_rate = document.createElement("span");
      post_rate.innerText = post.rate;
      post_rate.className = "post_rate";
      a.append(post_rate);
    }

    POSTS_CONTAINER.append(li);
  });
};

const fetchMorePosts = async () => {
  fetching = true;
  console.log(FIRST_POST_ID);
  axios
    .post(POSTS_URL, {
      page: page++,
      category: category,
      FIRST_POST_ID: FIRST_POST_ID,
      POST_PER_PAGE: POST_PER_PAGE,
    })
    .then(function (response) {
      data = response.data;
      console.log(data);
      modifyPost(data);
      rateToStar();
    })
    .catch(function (error) {
      console.log(error);
    });
  fetching = false;
};

const handleScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
    fetchMorePosts();
  }
};

window.addEventListener("scroll", handleScroll);
