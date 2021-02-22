const SECTION_2 = document.querySelector(".section-2");
const TOOL_BTN = SECTION_2.querySelector("button");
const TOOLS_LIST = [
  "django_seed",
  "Pillow",
  "django-allauth",
  "django-ckeditor",
  "firebase-admin",
  "Firebase",
  "AOS",
  "Swiper",
  "Figma",
  "Jira",
  "AWS EC2",
  "Google Fonts",
  "Font Awesome",
  "Slack",
  "Notion",
  "NGINX",
  "uWSGI",
  "오픈API",
  "Adobe Illustrator",
  "RateIt",
];

const createToolElement = () => {
  const toolElement = document.createElement("span");

  // className
  toolElement.className = "tool-element";

  // innerText
  toolElement.innerText =
    TOOLS_LIST[Math.floor(Math.random() * TOOLS_LIST.length)];

  // style
  toolElement.style.fontSize = `${Math.random() * 50 + 20}px`;
  toolElement.style.fontWeight = "600";
  toolElement.style.color =
    "#" + Math.floor(Math.random() * 0xfffffe).toString(16);
  toolElement.style.textShadow = `#${Math.floor(
    Math.random() * 0xfffffe
  ).toString(16)} 2px 2px 1px`;
  toolElement.style.position = "absolute";
  toolElement.style.top = `${Math.random() * 100}%`;
  toolElement.style.left = `${Math.random() * 100}%`;
  toolElement.style.transform = `rotate(${
    Math.random() * 360
  }deg) translateX(-50%) translateY(-50%)`;
  toolElement.draggable = "true";

  return toolElement;
};

const onToolBtnClick = () => {
  const newToolElement1 = createToolElement();
  const newToolElement2 = createToolElement();

  SECTION_2.append(newToolElement1, newToolElement2);
};

const tools_init = () => {
  TOOL_BTN.addEventListener("click", onToolBtnClick);
};

tools_init();
