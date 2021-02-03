const POST_RATE_LIST = document.querySelectorAll(".post_rate");

function rateToStar(rate_list) {
  rate_list.forEach((element) => {
    number = parseInt(element.innerText);
    fullStarNum = number / 2;
    fullStarNum = Math.floor(fullStarNum);
    halfStarNum = number - fullStarNum * 2;

    starContainer = document.createElement("span");
    for (let i = 0; i < fullStarNum; i++) {
      fullStar = document.createElement("i");
      fullStar.className = "fas fa-star";
      starContainer.appendChild(fullStar);
    }
    if (halfStarNum == 1) {
      halfStar = document.createElement("i");
      halfStar.className = "fas fa-star-half";
      starContainer.appendChild(halfStar);
    }
    element.innerText = "";
    element.appendChild(starContainer);
  });
}

function init() {
  rateToStar(POST_RATE_LIST);
}

init();
