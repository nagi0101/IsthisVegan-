const SEARCH_BTN = document.querySelector("#product_search_btn");
const SEARCH_INPUT = document.querySelector("#product_search_input");

const modifyDataList = (data_list) => {
  const oldUl = document.querySelector("#search_result > ul");
  const newUl = document.createElement("ul");
  data_list.forEach((data) => {
    const li = document.createElement("li");
    const image = document.createElement("img");
    const name = document.createElement("span");
    const category = document.createElement("span");
    const ingredient = document.createElement("span");
    const prdlstReportNo = document.createElement("span");

    // 안에 들어갈 text 설정
    name.innerText = data["prdlstNm"];
    category.innerText = data["prdkind"];
    prdlstReportNo.innerText = data["prdlstReportNo"]
    //const prdlstReportNo = data["prdlstReportNo"]
    const rawmtrl = data["rawmtrl"];
    const allergy = data["allergy"];

    if (allergy === "알수없음") {
      ingredient.innerText = rawmtrl;
    } else {
      ingredient.innerText = rawmtrl + "\n 알러지 정보 : " + allergy;
    }
    ingredient.style.display = "none";
    prdlstReportNo.style.display = "none";

    // class, src 등 설정
    name.className = "product_name";
    category.className = "product_category";
    ingredient.className = "product_ingredient";
    prdlstReportNo.className = "product_id";
    image.src = data["imgurl1"];
    li.onclick = onClickProductDetail;

    // DOM Tree 구성
    li.append(image, name, category, ingredient, prdlstReportNo);
    newUl.append(li);
    console.log("appended!");
  });
  oldUl.parentElement.replaceChild(newUl, oldUl);
};

const searchProductList = (init) => {
  let searchInput = SEARCH_INPUT.value;
  if (init !== "") {
    searchInput = init;
  }
  requestUrl = "/search_prd/search_btn_clicked/";
  // 공백일 경우 함수 탈출
  if (!searchInput) {
    return;
  }
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios
    .post(requestUrl, {
      searchInput: searchInput,
    })
    // 응답(성공)
    .then(function (response) {
      data_list = response.data.list;
      modifyDataList(data_list);
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

const onKeyUp = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    SEARCH_BTN.click();
  }
};

const onProductSearchBtnClicked = () => {
  searchProductList("");
};

const init = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const init = urlParams.get("init");
  searchProductList(init);
};

init();
// if clickBtn{
//     axios.poss{

//     }.then(request){
//          li(image, name, company, )
//         .search_result>ul.append("li")
//     }
// }
