const BADGE_COLOR_TABLE = [
  { background: "#CED46A", text: "#07553B" },
  { background: "#0A174E", text: "#F5D042" },
  { background: "#A4193D", text: "#FFDFB9" },
  { background: "#3B1877", text: "#DA5A2A" },
];

function userLevelBadge(badgeSize = "25px") {
  const level_list = document.querySelectorAll(".user-level");
  level_list.forEach((element) => {
    const level = parseInt(element.innerText);
    let badge_level = parseInt(level / 10);
    if (badge_level > BADGE_COLOR_TABLE.length - 1) {
      badge_level = BADGE_COLOR_TABLE.length - 1;
    }

    const badge = document.createElement("div");
    const span = document.createElement("span");

    // className
    element.className = "user-level-badge";
    badge.classList.add("level-badge");

    // innerHtml
    element.innerText = "";
    span.innerText = level;

    // style
    element.style.display = "flex";
    element.style.justifyContent = "center";
    element.style.alignItems = "center";
    badge.style.width = badgeSize;
    badge.style.height = badgeSize;
    badge.style.borderRadius = "50%";
    badge.style.display = "flex";
    badge.style.justifyContent = "center";
    badge.style.alignItems = "center";
    badge.style.backgroundColor = BADGE_COLOR_TABLE[badge_level].background;
    span.style.display = "flex";
    span.style.justifyContent = "center";
    span.style.alignItems = "center";
    span.style.textAlign = "center";
    span.style.fontWeight = "600";
    span.style.color = BADGE_COLOR_TABLE[badge_level].text;

    // HTML DOM
    badge.append(span);
    element.append(badge);
  });
}
