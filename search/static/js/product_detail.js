const showProductDetail = (clickedLi) => {
  requestUrl = "/search_prd/search_detail_filter/";
  const ingredientSpan = clickedLi.querySelector(".product_ingredient");
  const ingredientText = ingredientSpan.innerText;
  console.log(ingredientText);
  axios
    .post(requestUrl, {
      ingredientText: ingredientText,
    })
    // 응답(성공)
    .then(function (response) {
      data = response.data;
      console.log(data);
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
  showProductDetail(clickedLi);
};
