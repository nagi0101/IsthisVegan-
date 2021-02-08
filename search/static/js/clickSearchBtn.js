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

    // 안에 들어갈 text 설정
    name.innerText = data["prdlstNm"];
    category.innerText = data["prdkind"];
    const rawmtrl = data["rawmtrl"];
    const allergy = data["allergy"];
    if (allergy === "알수없음") {
      ingredient.innerText = rawmtrl;
    } else {
      ingredient.innerText = rawmtrl + allergy;
    }

    // class, src 등 설정
    image.src = data["imgurl1"];

    // DOM Tree 구성
    li.append(image, name, category, ingredient);
    newUl.append(li);
    console.log("appended!");
  });
  oldUl.parentElement.replaceChild(newUl, oldUl);
};

const onProductSearchBtnClicked = () => {
  const searchInput = SEARCH_INPUT.value;
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
      console.log(response);
      data_list = response.data.list;
      console.log(data_list);
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
// if clickBtn{
//     axios.poss{

//     }.then(request){
//          li(image, name, company, )
//         .search_result>ul.append("li")
//     }
// }
