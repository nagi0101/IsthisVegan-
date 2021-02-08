const onClickProductDetail = (event) => {
  const target = event.target;
  const li = target.closest("li");
  console.log(li);
};
