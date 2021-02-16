const BACKGROUND_LIST = document.querySelectorAll(".content_bg");
const BACKGROUND_MAX_INDEX = BACKGROUND_LIST.length - 1;

let bg_next_index = 1;
let bg_now = BACKGROUND_LIST[bg_next_index - 1];

function changeBackground() {
  // 현재 bg를 숨긴다
  bg_now.classList.remove("content_bg-active");
  // 현재 bg를 다음 bg로 변경한다.
  bg_now = BACKGROUND_LIST[bg_next_index];
  // 현재 bg를 보이게 한다.
  bg_now.classList.add("content_bg-active");
  // 만약 다음 bg가 BACKGROUND_MAX_INDEX 이상이라면
  // 다음 bg를 첫번재 bg로 설정하고, 그렇지 않을 경우
  // bg_next_index를 1 증가시킨다.
  if (bg_next_index >= BACKGROUND_MAX_INDEX) {
    bg_next_index = 0;
  } else {
    bg_next_index++;
  }
}

function init() {
  bg_now.classList.add("content_bg-active");
  setInterval(changeBackground, 4000);
}

init();
