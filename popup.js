const popupNode = document.querySelector(".js-popup");
const popupFormNode = document.querySelector(".js-popup-form");
const popupInputNode = document.querySelector(".js-popup-input");
const popupSubmitNode = document.querySelector(".js-popup-submit");
const popupCloseNode = document.querySelector(".js-popup-close");

function openPopup() {
  popupNode.style.display = "block";
  popupInputNode.value = currentLimit; // Используем текущий лимит для отображения
}

function closePopup() {
  popupNode.style.display = "none";
}
