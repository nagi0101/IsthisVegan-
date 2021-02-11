const onClickCloseModalBtn = () => {
  const background = document.querySelector(".modal_background");
  background.remove();
};

const onClickTipOffModalBtn = () => {
  //window.location.href = 'tipoff/'
  product_id = document.querySelector(".id_span").innerText;
  console.log(product_id)

};

const createVeganInfoBox = (clickedLi, data) => {
  console.log(data);
  const categoryList = data["category_list"];
  const veganFilter = data["vegan_filter"];
  const ingredientName = data["ingredient_name"];

  // create element
  const veganInfoBox = document.createElement("div");
  const ingredientBox = document.createElement("div");
  const veganFilterBox = document.createElement("div");
  const ingredientSpan = document.createElement("span");
  const veganFilterSpan = document.createElement("span");

  // set innerThel
  let innerHTML = clickedLi.querySelector(".product_ingredient").innerHTML;
  categoryList.forEach((categoryName) => {
    ingredientName[categoryName].forEach((name) => {
      let index = innerHTML.indexOf(name);
      innerHTML =
        innerHTML.substring(0, index) +
        `<span class=${categoryName}>` +
        innerHTML.substring(index, index + name.length) +
        "</span>" +
        innerHTML.substring(index + name.length);
    });
  });
  ingredientSpan.innerHTML = innerHTML;
  categoryList.forEach((element) => {
    if (veganFilter[element] === true) {
      veganFilterSpan.innerText += `${element} : O    `;
    } else {
      veganFilterSpan.innerText += `${element} : X    `;
    }
  });
  console.log(veganFilterSpan);

  // set HTML DOM
  ingredientBox.append(ingredientSpan);
  veganFilterBox.append(veganFilterSpan);
  veganInfoBox.append(ingredientBox, veganFilterBox);

  return veganInfoBox;
};

const showProductModal = (clickedLi, data) => {
  const body = document.querySelector("body");

  //   create modal
  const background = document.createElement("div");
  const modal = document.createElement("div");
  const imageBox = document.createElement("div");
  const nameBox = document.createElement("div");
  const idBox = document.createElement("div")
  const image = document.createElement("img");
  const nameSpan = document.createElement("span");
  const idSpan = document.createElement("span")
  const closeModalBtn = document.createElement("button");
  const tipoffModalBtn = document.createElement("button");

  const veganInfoBox = createVeganInfoBox(clickedLi, data);

  //   innerText 설정
  nameSpan.innerText = clickedLi.querySelector(".product_name").innerText;
  idSpan.innerText = clickedLi.querySelector(".product_id").innerText;

  closeModalBtn.innerText = "닫기";
  tipoffModalBtn.innerText = "제보하기";

  // img src, className, onclick 설정
  background.className = "modal_background";
  imageBox.className = "modal_image";
  closeModalBtn.className = "modal_button";
  tipoffModalBtn.className = "modal_button";
  nameSpan.className = "name_span";
  idSpan.className = "id_span";
  
  image.src = clickedLi.querySelector("img").src;
  closeModalBtn.onclick = onClickCloseModalBtn;
  tipoffModalBtn.onclick = onClickTipOffModalBtn;

  // style 설정
/*   background.style.position = "fixed";
  background.style.width = "100%";
  background.style.height = "100%";
  background.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  background.style.display = "flex";
  background.style.alignItems = "center";
  background.style.justifyContent = "center";
  background.style.top = "0";
  background.style.left = "0";
  imageBox.style.display = "flex";
  imageBox.style.justifyContent = "center";
  closeModalBtn.style.display = "flex";
  closeModalBtn.style.justifyContent = "center";
  closeModalBtn.style.alignItems = "center"; */

  modal.style.backgroundColor = "#ffffff";
  idSpan.style.display = "none";
  // HTML DOM 구성
  imageBox.append(image);
  nameBox.append(nameSpan);
  idBox.append(idSpan);
  modal.append(imageBox, nameBox, veganInfoBox, idBox, closeModalBtn, tipoffModalBtn);
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
