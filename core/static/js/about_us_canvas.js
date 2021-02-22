const SECTION_3 = document.querySelector(".section-3");
const SECTION_3_COLOR_LIST_CONTAINER = SECTION_3.querySelector(
  ".color-list-container"
);
const SECTION_3_COLOR_LIST = [
  { name: "IsThis? Green!", code: "#E5E5E5" },
  { name: "IsThis? YellowGreen!", code: "#AACD6E" },
  { name: "IsThis? Red!", code: "#F16B6F" },
  { name: "IsThis? Pink!", code: "#D9C1B8" },
  { name: "IsThis? Gray!", code: "#C5C6B6" },
  { name: "IsThis? DeepBrown!", code: "#3C3530" },
];
const SECTION_3_CANVAS = SECTION_3.querySelector("canvas");

const onMouseMove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  console.log(x, y);
};

const canvas_init = () => {
  SECTION_3_CANVAS.width = SECTION_3_CANVAS.style.width;
  SECTION_3_CANVAS.height = SECTION_3_CANVAS.style.height;
  SECTION_3_CANVAS.addEventListener("mousemove", onMouseMove);
};

canvas_init();
