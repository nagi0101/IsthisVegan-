const SECTION_3 = document.querySelector(".section-3");
const SECTION_3_COLOR_LIST_CONTAINER = SECTION_3.querySelector(
  ".color-list-container"
);
const SECTION_3_COLOR_LIST = [
  { name: "IsThis? Green!", code: "#92BF56" },
  { name: "IsThis? YellowGreen!", code: "#AACD6E" },
  { name: "IsThis? Red!", code: "#F16B6F" },
  { name: "IsThis? Pink!", code: "#D9C1B8" },
  { name: "IsThis? Gray!", code: "#C5C6B6" },
  { name: "IsThis? DeepBrown!", code: "#3C3530" },
];
const SECTION_3_CANVAS = SECTION_3.querySelector("canvas");
const SECTION_3_COLOR_NAME = SECTION_3.querySelector(".color-name");
const SECTION_3_CANVAS_CTX = SECTION_3_CANVAS.getContext("2d");
const SECTION_3_BRUSH_RANGE = SECTION_3.querySelector(".brush-range");
const SECTION_3_BRUSH_PREVIEW = SECTION_3.querySelector(".brush-preview");

let color_selected;
let painting;

const create_new_color_btn = (color) => {
  const btn = document.createElement("button");

  btn.className = "color-btn";

  btn.dataset.color = color.code;
  btn.dataset.name = color.name;

  btn.style.backgroundColor = color.code;
  btn.style.width = "30px";
  btn.style.height = "30px";
  btn.style.border = "3px solid white";
  btn.style.borderRadius = "50%";

  return btn;
};

const onColorBtnClicked = (e) => {
  target = e.target;
  const prevClickedBtn = document.querySelector(".color-btn-clicked");
  prevClickedBtn.classList.remove("color-btn-clicked");
  target.classList.add("color-btn-clicked");
  SECTION_3_COLOR_NAME.innerText = `${target.dataset.name} / ${target.dataset.color}`;
  SECTION_3_COLOR_NAME.style.color = target.dataset.color;
  SECTION_3_BRUSH_PREVIEW.style.backgroundColor = target.dataset.color;
};

const addColorBtns = () => {
  SECTION_3_COLOR_LIST.forEach((color) => {
    const newBtn = create_new_color_btn(color);
    newBtn.addEventListener("click", onColorBtnClicked);
    SECTION_3_COLOR_LIST_CONTAINER.append(newBtn);
  });
};

function stopPainting() {
  painting = false;
  SECTION_3_CANVAS_CTX.closePath();
}

function startPainting(e) {
  const x = Math.floor(e.offsetX);
  const y = Math.floor(e.offsetY);
  SECTION_3_CANVAS_CTX.beginPath();
  SECTION_3_CANVAS_CTX.strokeStyle = document.querySelector(
    ".color-btn-clicked"
  ).dataset.color;
  SECTION_3_CANVAS_CTX.lineWidth = SECTION_3_BRUSH_RANGE.value;
  SECTION_3_CANVAS_CTX.lineCap = "round";
  SECTION_3_CANVAS_CTX.lineJoin = "round";
  SECTION_3_CANVAS_CTX.moveTo(x, y);
  painting = true;
}

const onMouseMove = (e) => {
  // if (!painting) {
  //   console.log("creating path in", x, y);
  //   SECTION_3_CANVAS_CTX.beginPath();
  //   SECTION_3_CANVAS_CTX.strokeStyle = document.querySelector(
  //     ".color-btn-clicked"
  //   ).dataset.color;
  //   SECTION_3_CANVAS_CTX.lineWidth = SECTION_3_BRUSH_RANGE.value;
  //   SECTION_3_CANVAS_CTX.lineCap = "round";
  //   SECTION_3_CANVAS_CTX.lineJoin = "round";
  //   //마우스를 클릭안해도 path는 계속 생성되고 있지만
  //   // 클릭과 동시에 else로 넘어가서 line to를 실행시킴
  //   // (이전 path - > else path까지 실행)
  //   SECTION_3_CANVAS_CTX.moveTo(x, y);
  // } else {
  //   console.log("creating line in", x, y);
  //   SECTION_3_CANVAS_CTX.lineTo(x, y);
  //   SECTION_3_CANVAS_CTX.stroke();
  // }
  if (painting) {
    const x = Math.floor(e.offsetX);
    const y = Math.floor(e.offsetY);
    //마우스를 클릭안해도 path는 계속 생성되고 있지만
    // 클릭과 동시에 else로 넘어가서 line to를 실행시킴
    // (이전 path - > else path까지 실행)

    SECTION_3_CANVAS_CTX.lineTo(x, y);
    SECTION_3_CANVAS_CTX.stroke();
    // SECTION_3_CANVAS_CTX.closePath();
  }
};

const canvas_init = () => {
  SECTION_3_CANVAS.width = 500;
  SECTION_3_CANVAS.height = 500;
  SECTION_3_CANVAS.addEventListener("mousemove", onMouseMove);
  SECTION_3_CANVAS.addEventListener("mousedown", startPainting);
  SECTION_3_CANVAS.addEventListener("mouseup", stopPainting);
};

const onBrushRangeChange = () => {
  SECTION_3_BRUSH_PREVIEW.style.width = `${SECTION_3_BRUSH_RANGE.value * 2}px`;
  SECTION_3_BRUSH_PREVIEW.style.height = `${SECTION_3_BRUSH_RANGE.value * 2}px`;
};

const color_init = () => {
  canvas_init();
  addColorBtns();
  const firstColorBtn = SECTION_3_COLOR_LIST_CONTAINER.firstElementChild;
  firstColorBtn.classList.add("color-btn-clicked");
  SECTION_3_COLOR_NAME.innerText = `${firstColorBtn.dataset.name} / ${firstColorBtn.dataset.color}`;
  SECTION_3_COLOR_NAME.style.color = firstColorBtn.dataset.color;
  SECTION_3_BRUSH_PREVIEW.style.width = `${SECTION_3_BRUSH_RANGE.value * 2}px`;
  SECTION_3_BRUSH_PREVIEW.style.height = `${SECTION_3_BRUSH_RANGE.value * 2}px`;
  SECTION_3_BRUSH_PREVIEW.style.backgroundColor = firstColorBtn.dataset.color;
  SECTION_3_BRUSH_PREVIEW.style.borderRadius = "50%";
  SECTION_3_BRUSH_RANGE.addEventListener("input", onBrushRangeChange);
};

color_init();
