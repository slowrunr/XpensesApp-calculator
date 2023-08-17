const popupNode = document.getElementById("reviseLimitPopup");
const popupFormNode = document.getElementById(".popupBox");
const popupInputNode = document.getElementById(".popupInput");
const popupSubmitNode = document.getElementById(".popupSubmit");
const closePopupBtnNode = document.getElementById(".closePopupBtn");

function openPopup() {
  popupNode.style.display = "block";
  popupInputNode.value = currentLimit;
}

function closePopup() {
  popupNode.style.display = "none";
}

function reviseLimit(event) {
  event.preventDefault();
  const newLimit = parseInt(popupInputNode.value);
  if (!isNaN(newLimit)) {
    currentLimit = newLimit; // Обновляем текущий лимит
    saveLimitToLocalStorage(currentLimit); // Сохраняем новое значение лимита в локальное хранилище
    moneyLimitNodeimitNode.innerText = currentLimit; // Используем текущий лимит для отображения
    render();
    closePopup();
  }
}

reviseLimitBtnNode.addEventListener("click", openPopup);
popupFormNode.addEventListener("submit", reLimit);
popupCloseNode.addEventListener("click", closePopup);
