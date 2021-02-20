const NOTIFICATION_CONTAINER = document.querySelector(
  ".notifications_container"
);
const NOTIFICATION_BTN = NOTIFICATION_CONTAINER.querySelector(
  ".notifications_btn"
);

const onNotificationBtnClicked = () => {
  console.log("clicked!");
  NOTIFICATION_CONTAINER.classList.toggle("showing_notifications");
};

const initInAppNotification = () => {
  NOTIFICATION_BTN.addEventListener("click", onNotificationBtnClicked);
};

initInAppNotification();
