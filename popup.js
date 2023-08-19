const reviseLimitBtnNode = document.getElementById("reviseLimitBtn");
const popupNode = document.getElementById("popup");
const popupFormNode = document.getElementById("popupForm");
const popupInputNode = document.getElementById("newLimitInput");
const popupSubmitNode = document.getElementById("submitNewLimitBtn");
const popupCloseNode = document.getElementById("closePopupBtn");

function openPopup() {
  popupNode.style.display = "block";
  popupInputNode.value = currentLimit;
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
