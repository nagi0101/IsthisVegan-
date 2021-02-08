const onClickCloseModalBtn = () => {
  const background = document.querySelector(".modal_background");
  remove(background);
};

const createVeganInfoBox = (data) => {
  const categoryList = data["category_list"];
  const veganFilter = data["vegan_filter"];
  const veganIndex = data["vegan_index"];

  const ingredientBox = document.createElement("div");
  const veganFilterBox = document.createElement("div");
  const ingredientSpan = document.createElement("span");
  const veganFilterSpan = document.createElement("span");

  ingredientSpan.innerText = clickedLi.querySelector(
    ".product_ingredient"
  ).innerText;
  veganIndex.forEach((element) => {
    if (veganFilter[element] === true) {
      console.log(element + " true");
    }
  });
};

const showProductModal = (clickedLi, data) => {
  const body = document.querySelector("body");

  //   create modal
  const background = document.createElement("div");
  const modal = document.createElement("div");
  const imageBox = document.createElement("div");
  const nameBox = document.createElement("div");

  const image = document.createElement("img");
  const nameSpan = document.createElement("span");

  const closeModalBtn = document.createElement("button");

  const veganInfoBox = createVeganInfoBox(data);

  //   innerText 설정
  nameSpan.innerText = clickedLi.querySelector(".product_name").innerText;

  closeModalBtn.innerText = "닫기";

  // img src, className, onclick 설정
  background.className = "modal_background";
  image.src = clickedLi.querySelector("img").src;
  closeModalBtn.onclick = onClickCloseModalBtn;

  // style 설정
  background.style.position = "fixed";
  background.style.width = "100%";
  background.style.height = "100%";
  background.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  background.style.display = "flex";
  background.style.alignItems = "center";
  background.style.justifyContent = "center";
  background.style.top = "0";
  background.style.left = "0";

  modal.style.backgroundColor = "#ffffff";

  // HTML DOM 구성
  imageBox.append(image);
  nameBox.append(nameSpan);
  ingredientBox.append(ingredientSpan);
  veganFilterBox.append(veganFilterSpan);
  modal.append(imageBox, nameBox, closeModalBtn);
  background.append(modal);
  body.append(background);
};

const getProductDetail = (clickedLi) => {
  requestUrl = "/search_prd/search_detail_filter/";
  const ingredientSpan = clickedLi.querySelector(".product_ingredient");
  const ingredientText = ingredientSpan.innerText;
  axios
    .post(requestUrl, {
      ingredientText: ingredientText,
    })
    // 응답(성공)
    .then(function (response) {
      data = response.data;
      console.log(data);
      showProductModal(clickedLi, data);
    })
    // 응답(실패)
    .catch(function (error) {
      console.log(error);
    })
    // 응답(항상 실행)
    .then(function () {
      // ...
    });
};

const onClickProductDetail = (event) => {
  const target = event.target;
  const clickedLi = target.closest("li");
  getProductDetail(clickedLi);
};
