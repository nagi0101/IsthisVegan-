const closeModal = () => {
  const background = document.querySelector(".modal_background");
  const modal = document.querySelector(".modal");
  modal.remove();
  background.remove();
};

const onClickTipOffModalBtn = () => {
  product_id = document.querySelector(".id_span").innerText;

  function parse_cookies() {
    var cookies = {};
    if (document.cookie && document.cookie !== "") {
      document.cookie.split(";").forEach(function (c) {
        var m = c.trim().match(/(\w+)=(.*)/);
        if (m !== undefined) {
          cookies[m[1]] = decodeURIComponent(m[2]);
        }
      });
    }
    return cookies;
  }
  const cookies = parse_cookies();

  const form = document.createElement("form");
  form.setAttribute("method", "Post");
  form.setAttribute("action", "tipoff/");

  const idField = document.createElement("input");
  idField.setAttribute("type", "hidden");
  idField.setAttribute("name", "prdlstReportNo");
  idField.setAttribute("value", product_id);
  form.appendChild(idField);

  const hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", "csrfmiddlewaretoken");
  hiddenField.setAttribute("value", cookies["csrftoken"]);
  form.appendChild(hiddenField);

  document.body.appendChild(form);
  form.submit();
};

const indexes = (source, find) => {
  let result = [];
  const findLength = find.length;
  for (let index = 0; index < source.length; index++) {
    if (source.substring(index, index + findLength) == find) {
      result.push(index);
    }
  }
  // result를 내림차순으로 정렬한다.
  result.sort(function (a, b) {
    return a > b ? -1 : a === b ? 0 : -1;
  });
  console.log(result);
  return result;
};

const createVeganInfoBox = (clickedLi, data) => {
  const categoryList = data["category_list"];
  const veganFilter = data["vegan_filter"];
  const ingredientName = data["ingredient_name"];

  // create element
  const veganInfoBox = document.createElement("div");
  const ingredientBox = document.createElement("div");
  const veganFilterBox = document.createElement("div");
  const ingredientSpan = document.createElement("span");
  const veganFilterSpan = document.createElement("span");
  const iconSpan = document.createElement("span");

  // set innerHTML
  let innerHTML = clickedLi.querySelector(".product_ingredient").innerHTML;
  categoryList.forEach((categoryName) => {
    // ingredientName[categoryName]를 이름 길이가 긴 순서로 정렬한다.
    // "닭", "닭고기" 등이 같이 있을 경우 닭을 먼저 처리하면
    // "<span>닭</span>고기"가 되어서 "닭고기"를 처리할 때 오류가 나는 것을
    // 방지하기 위해서이다.
    ingredientName[categoryName].sort((a, b) => {
      const keyA = a.length,
        keyB = b.length;
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    ingredientName[categoryName].forEach((name) => {
      const ingredientIndexes = indexes(innerHTML, name);
      for (let i = 0; i < ingredientIndexes.length; i++) {
        let index = ingredientIndexes[i];
        // index가 -1인 경우 예상치 못한 오류가 발생한 것이다.
        // 두 가지 이상의 식재료가 겹쳐서 적혀있을 경우가 그러하다.
        // 그 경우 오류가 발생한 ingredient는 표시하지 않는다.
        if (index !== -1) {
          innerHTML =
            innerHTML.substring(0, index) +
            `<span class=${categoryName}>` +
            innerHTML.substring(index, index + name.length) +
            "</span>" +
            innerHTML.substring(index + name.length);
        }
      }
    });
  });
  let filterNum = 0;
  ingredientSpan.innerHTML = innerHTML;
  categoryList.forEach((element) => {
    if (veganFilter[element] === true) {
      veganFilterSpan.innerText += `${element} : O    `;
      iconSpan.innerHTML += "<img src=\"" + `/static/img/${element}.png` +  "\">";
      filterNum++;
    } else {
      veganFilterSpan.innerText += `${element} : X    `;
    }
  });

  if(filterNum == 0){
    iconSpan.innerHTML += "<img src=\"" + `/static/img/VEGI.png` +  "\">";
  }

  // set ClassName
  veganFilterBox.className = "modal_vegan_filter";

  // set HTML DOM
  ingredientBox.append(ingredientSpan);
  veganFilterBox.append(veganFilterSpan);
  veganInfoBox.append(ingredientBox, veganFilterBox, iconSpan);

  return veganInfoBox;
};

const showProductModal = (clickedLi, data) => {
  const body = document.querySelector("body");

  //   create modal
  const background = document.createElement("div");
  const modal = document.createElement("div");
  const imageBox = document.createElement("div");
  const nameBox = document.createElement("div");
  const idBox = document.createElement("div");
  const image = document.createElement("img");
  const idSpan = document.createElement("span");
  const closeModalBtn = document.createElement("button");
  const tipoffModalBtn = document.createElement("button");
  const veganInfoBox = createVeganInfoBox(clickedLi, data);
  //const iconBox = document.createElement("span");

  //   innerText 설정
  nameBox.innerText = clickedLi.querySelector(".product_name").innerText;
  idSpan.innerText = clickedLi.querySelector(".product_id").innerText;

  //iconBox.innerHTML += "<img src=\"" + `/static/img/${element}.png` +  "\">";
  //iconBox.innerHTML = "<img src=\"" + `/static/img/default.png` +  "\">";
  
  closeModalBtn.innerText = "닫기";
  tipoffModalBtn.innerText = "제보하기";

  // img src, className, onclick 설정
  background.className = "modal_background";
  modal.className = "modal";
  imageBox.className = "modal_image";
  closeModalBtn.className = "modal_button";
  nameBox.className = "modal_product_name";
  veganInfoBox.className = "modal_vegan_info";
  tipoffModalBtn.className = "modal_button";
  idSpan.className = "id_span";

  image.src = clickedLi.querySelector("img").src;
  closeModalBtn.onclick = closeModal;
  background.onclick = closeModal;
  tipoffModalBtn.onclick = onClickTipOffModalBtn;

  idSpan.style.display = "none";
  // HTML DOM 구성
  imageBox.append(image);
  idBox.append(idSpan);
  modal.append(
    imageBox,
    nameBox,
    //iconBox,
    veganInfoBox,
    idBox,
    closeModalBtn,
    tipoffModalBtn
  );
  body.append(background, modal);
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
