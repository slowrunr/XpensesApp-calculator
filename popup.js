const reviseLimitBtnNode = document.getElementById("reviseLimitBtn");
const popupNode = document.querySelector(".js-popup");
const popupFormNode = document.querySelector(".js-popup-form");
const popupInputNode = document.querySelector(".js-popup-input");
const popupSubmitNode = document.querySelector(".js-popup-submit");
const popupCloseNode = document.querySelector(".js-popup-close");

function openPopup() {
  console.log("proverka");
  popupNode.style.display = "block";
  popupInputNode.value = currentLimit; // Используем текущий лимит для отображения
}

function closePopup() {
  popupNode.style.display = "none";
}

function changeLimit(event) {
  event.preventDefault();
  const newLimit = parseInt(popupInputNode.value);
  if (!isNaN(newLimit)) {
    currentLimit = newLimit; // Обновляем текущий лимит
    // saveLimitToLocalStorage(currentLimit); // Сохраняем новое значение лимита в локальное хранилище
    moneyLimitNode.innerText = currentLimit; // Используем текущий лимит для отображения
    render();
    closePopup();
  }
}

reviseLimitBtnNode.addEventListener("click", openPopup);
popupFormNode.addEventListener("submit", changeLimit);
popupCloseNode.addEventListener("click", closePopup);
