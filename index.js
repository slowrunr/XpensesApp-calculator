// строковые константы
const CURRENCY = "\u20bd";
const EXPENSES_FROM_STORAGE = "storedExpenses";
const DEFAULT_LIMIT = 10000;
const DEFAULT_SUM = 0;
const LIMIT_FROM_STORAGE = "storedLimit";
const REVISE_MONEY_LIMIT_TEXT = "Задайте новый лимит";
const STATUS_IN_LIMIT = " Всё хорошо";
const STATUS_OUT_OF_LIMIT = " Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";
const STATUS_OUT_OF_DATA_CLASSNAME = "status__border-red";

// переменные для работы с HTML в алфавитном порядке
const addSumBtnNode = document.getElementById("addSumBtn");
const clearHistoryBtnNode = document.getElementById("clearHistoryBtn");
const expenseCategoryNode = document.getElementById("categoryInput");
const expensesInputNode = document.getElementById("expensesInput");
const expensesNode = document.getElementById("expenses");
const inputWrapperNode = document.getElementById("inputWrapper");
const popupCloseNode = document.getElementById("closePopupBtn");
const popupCurrentLimitNode = document.getElementById("currentMoneyLimit");
const popupFormNode = document.getElementById("popupForm");
const popupInputNode = document.getElementById("newLimitInput");
const popupNode = document.getElementById("popup");
const popupSubmitNode = document.getElementById("submitNewLimitBtn");
const reviseLimitBtnNode = document.getElementById("reviseLimitBtn");
const statusNode = document.getElementById("status");
const sumUpNode = document.getElementById("sumUp");

// получаем лимит из этой переменной
const moneyLimitNode = document.getElementById("moneyLimit");
let currentLimit = parseInt(moneyLimitNode.innerText);

//функция загрузки лимита средств из локального хранилища браузера
function getLimitFromStorage() {
  const limitFromStorage = parseInt(localStorage.getItem(LIMIT_FROM_STORAGE));
  if (!limitFromStorage) {
    currentLimit = DEFAULT_LIMIT;
  }
  moneyLimitNode.innerText = localStorage.getItem(LIMIT_FROM_STORAGE);
  currentLimit = parseInt(moneyLimitNode.innerText);
}

//функция загрузки лимита из локального хранилища браузера
getLimitFromStorage();
const expensesFromStorageToString = localStorage.getItem(EXPENSES_FROM_STORAGE);
const expensesFromStorageParsed = JSON.parse(expensesFromStorageToString);

// переменные с массивами
let expenses = [];

// валидация массива на массивность.)
if (Array.isArray(expensesFromStorageParsed)) {
  expenses = expensesFromStorageParsed;
}

// функция подсчета расходов (записана в виде стрелочной функции)
const calculateExpenses = () => {
  let sum = 0;
  expenses.forEach((expense) => {
    sum += expense.amount;
  });
  return sum;
};

render();

// функция сохранения расходов в локальном хранилище браузера
function saveExpensesInLocalStorage() {
  const expensesToString = JSON.stringify(expenses);
  localStorage.setItem(EXPENSES_FROM_STORAGE, expensesToString);
  console.log(expensesToString);
}

initApp();

// функция выполняющая первые действия при запуске и обновлении страницы
function initApp(expenses) {
  moneyLimitNode.innerText = currentLimit + ` ${CURRENCY}`;
  sumUpNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;
  renderStatus();
}

// функция-обработчик нажатия на кнопку "добавить"
function addSumBtnHandler() {
  const expense = getExpenseFromUser();
  if (!expense) {
    inputWrapperNode.classList.add(STATUS_OUT_OF_DATA_CLASSNAME);
    return;
  }
  inputWrapperNode.classList.remove(STATUS_OUT_OF_DATA_CLASSNAME);

  const newCategory = getCategoryFromUser();
  if (!newCategory) {
    expenseCategoryNode.classList.add(STATUS_OUT_OF_DATA_CLASSNAME);
    return;
  }
  expenseCategoryNode.classList.remove(STATUS_OUT_OF_DATA_CLASSNAME);

  const newExpense = { amount: expense, category: newCategory };
  console.log(newExpense);

  expenses.push(newExpense);
  saveExpensesInLocalStorage();
  render();
  clearInput();
}

// функция обновления отображения расходов, суммы и статуса
function render() {
  renderExpenses(expenses);
  renderSum();
  renderStatus();
}

// функция-обработчик нажатия кнопки "Очистить историю расходов"
function clearHistoryBtnHandler() {
  expenses = [];
  renderExpenses(expenses);
  sumUpNode.innerText = DEFAULT_SUM + ` ${CURRENCY}`;
  renderStatus();
}

// функция ввода траты
function getExpenseFromUser() {
  if (!expensesInputNode.value === "") {
    return;
  }

  const expense = parseInt(expensesInputNode.value);
  clearInput;
  return expense;
}

// функция выбора категории
function getCategoryFromUser() {
  return expenseCategoryNode.value;
}

// функция очистки значений полей ввода
function clearInput() {
  expensesInputNode.value = "";
  expenseCategoryNode.value = "";
}

// функция записи трат в массив
function trackExpense(newExpense) {
  expenses.push(newExpense);
}

// функция отображения расходов на странице
function renderExpenses(expenses) {
  let expensesListHTML = "";
  expenses.forEach((newExpense) => {
    expensesListHTML += `<li class="expense"> ${newExpense.category} - ${newExpense.amount} ${CURRENCY}</li>`; // сокращенная запись работы с циклом
  });
  expensesNode.innerHTML = `${expensesListHTML}`;
}

// функция отображения суммы расходов
function renderSum(expenses) {
  sumUpNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;
}

//функция изменения лимита средств
function reviseLimitHandler() {
  const newLimit = prompt(REVISE_MONEY_LIMIT_TEXT);
  const newLimitValue = parseInt(newLimit);
  if (!newLimitValue) {
    return;
  }
  moneyLimitNode.innerText = newLimitValue + ` ${CURRENCY}`;
  popupCurrentLimitNode.innerText = newLimitValue + ` ${CURRENCY}`;
  currentLimit = newLimitValue;

  localStorage.setItem(LIMIT_FROM_STORAGE, newLimitValue);
  renderStatus();
}

// функция индикации статуса "в пределах лимита"
function removeStatusRed() {
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  moneyLimitNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
}

// функция индикации статуса "превышение лимита"
function addStatusRed() {
  statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  moneyLimitNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
}

// функция отображения текущего статуса
function renderStatus() {
  const sum = calculateExpenses();
  removeStatusRed();
  if (sum <= currentLimit) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      currentLimit - sum
    } ${CURRENCY})`;
    addStatusRed();
  }
}

// функция выбора пункта из выпадающего меню
function show(a) {
  document.querySelector(".category__input").value = a;
}

let dropdown = document.querySelector(".dropdown");

dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};

// функция открытия popup-окна
function openPopup() {
  popupNode.style.display = "block";
  popupInputNode.value = "";
}

// функция закрытия popup-окна
function closePopup() {
  popupNode.style.display = "none";
}

// функция изменения лимита средств в popup-окне
function changeLimit(event) {
  event.preventDefault();
  const newLimit = parseInt(popupInputNode.value);
  if (!isNaN(newLimit)) {
    currentLimit = newLimit; // Обновляем текущий лимит
    // saveLimitToLocalStorage(currentLimit); // Сохраняем новое значение лимита в локальное хранилище
    moneyLimitNode.innerText = currentLimit; // Используем текущий лимит для отображения
    popupCurrentLimitNode.innerText = currentLimit + ` ${CURRENCY}`;

    localStorage.setItem(LIMIT_FROM_STORAGE, newLimit);

    render();
    closePopup();
  }
}

// привязка функций-обработчиков к кнопкам
addSumBtnNode.addEventListener("click", addSumBtnHandler);
clearHistoryBtnNode.addEventListener("click", clearHistoryBtnHandler);
moneyLimitNode.addEventListener("click", reviseLimitHandler);
popupFormNode.addEventListener("submit", changeLimit);
popupCloseNode.addEventListener("click", closePopup);
reviseLimitBtnNode.addEventListener("click", openPopup);

popupCurrentLimitNode.innerText = currentLimit + ` ${CURRENCY}`;
//08.2023//Happy Birthday my son!!!//
