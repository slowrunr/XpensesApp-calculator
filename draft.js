// функция изменения лимита средств в popup-окне - not working
function changeLimitHandler(event) {
  event.preventDefault();
  const newLimit = parseInt(popupInputNode.value);
  if (!newLimit) {
    popupInputWrapperNode.classList.add(STATUS_OUT_OF_DATA_CLASSNAME);
  }
  popupInputWrapperNode.classList.remove(STATUS_OUT_OF_DATA_CLASSNAME);
  currentLimit = newLimit;
  moneyLimitNode.innerText = currentLimit;
  popupCurrentLimitNode.innerText = currentLimit + ` ${CURRENCY}`;

  localStorage.setItem(LIMIT_FROM_STORAGE, newLimit);

  render();
  closePopup();
}

// порядок расположение констант. Сначала основные и не изменяемые (строковые константы - string)
const DEFAULT_LIMIT = 10000;
const DEFAULT_SUM = 0;
const CURRENCY = "\u20bd";
const STATUS_IN_LIMIT = " Всё хорошо";
const STATUS_OUT_OF_LIMIT = " Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";
const STATUS_OUT_OF_DATA_CLASSNAME = "status__border-red";
const REVISE_MONEY_LIMIT_TEXT = "Задайте новый лимит";

// далее переменные для работы с HTML
const expensesInputNode = document.getElementById("expensesInput");
const inputWrapperNode = document.getElementById("inputWrapper");
const addSumBtnNode = document.getElementById("addSumBtn");
const clearHistoryBtnNode = document.getElementById("clearHistoryBtn");
const expensesNode = document.getElementById("expenses");
const expenseCategoryNode = document.getElementById("categoryInput");
const sumUpNode = document.getElementById("sumUp");
const statusNode = document.getElementById("status");

// получаем лимит из этой переменной
const moneyLimitNode = document.getElementById("moneyLimit");
let currentLimit = DEFAULT_LIMIT;

// function getLimitFromStorage() {
//   const limitFromStorage = parseInt(localStorage.getItem("currentLimit"));
//   if (!limitFromStorage) {
//     currentLimit = DEFAULT_LIMIT;
//   }
//   moneyLimitNode.innerText = localStorage.getItem("currentLimit");
// }

// переменные с массивами
let expenses = [];

// вместо строчки function calculateExpenses() =
const calculateExpenses = () => {
  let sum = 0;
  expenses.forEach((expense) => {
    sum += expense.amount;
  });
  return sum;
};

// далее указываем, что отображается в HTML через JS и объединяем всё в функцию init(App)
initApp();

//+
function initApp(expenses) {
  moneyLimitNode.innerText = currentLimit + ` ${CURRENCY}`;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumUpNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;
}

//+
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
  render();
  clearInput();
}

//+
function render() {
  renderExpenses(expenses);
  renderSum();
  renderStatus();
}

//+
function clearHistoryBtnHandler() {
  expenses = [];
  renderExpenses(expenses);
  sumUpNode.innerText = DEFAULT_SUM + ` ${CURRENCY}`;
  renderStatus();
}

//+
function getExpenseFromUser() {
  if (!expensesInputNode.value === "") {
    return;
  }

  const expense = parseInt(expensesInputNode.value);
  // для работы с дробными числами можно заменить parseInt -> parseFloat
  clearInput;
  return expense;
}
// 2-й вариант записи этой функции:
//function(getExpenseFromUser) {
//  return.parseInt(expensesInputNode.value);}

//?
function getCategoryFromUser() {
  return expenseCategoryNode.value;
}

//+
function clearInput() {
  expensesInputNode.value = "";
  expenseCategoryNode.value = "";
}

// другой вариант записи функции с использованием стрелочной функции:
/* const clearInput() = (input) => {
  expensesInputNode.value = "";
}
или в виде анонимной функции, присвоенной костанте
const clearInput() = function(input){
  expensesInputNode.value = "";}*/

//+
function trackExpense(newExpense) {
  expenses.push(newExpense);
}

//+
function renderExpenses(expenses) {
  let expensesListHTML = "";
  expenses.forEach((newExpense) => {
    expensesListHTML += `<li class="expense"> ${newExpense.category} - ${newExpense.amount} ${CURRENCY}</li>`; // сокращенная запись работы с циклом
  });
  expensesNode.innerHTML = `${expensesListHTML}`;
}

//+
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
  moneyLimitNode.innerText = newLimitValue;
  currentLimit = newLimitValue;
  localStorage.setItem("currentLimit", newLimitValue);
  renderStatus();
}

//+
function removeStatusRed() {
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
  moneyLimitNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
}

//+
function addStatusRed() {
  statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  moneyLimitNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
}

//+
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

//+ функция выбора пункта из выпадающего меню
function show(a) {
  document.querySelector(".category__input").value = a;
}
let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};

// привязка функций-обработчиков к кнопкам
addSumBtnNode.addEventListener("click", addSumBtnHandler);
//reviseLimitBtnNode.addEventListener("click", reviseLimitHandler);
//moneyLimitNode.addEventListener("click", reviseLimitHandler);
clearHistoryBtnNode.addEventListener("click", clearHistoryBtnHandler);

//08.2023//Happy Birthday my son!!!//
///////////____________________________________________________________________//////

let LIMIT = 10000;
let currentLimit = LIMIT;
const CURRENCY = "TL";
const STATUS_IN_LIMIT = "все хорошо";
const STATUS_OUT_OF_LIMIT = "все плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const inputNode = document.querySelector(".js-expenses-amount-input");
const buttonNode = document.querySelector(".js-expenses-amount-btn");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const limitNode = document.querySelector(".js-limit");
const statusNode = document.querySelector(".js-status");
const currentCategoryNode = document.querySelector(".js-category");
const clearButtonNode = document.querySelector(".js-clear-button");
const limitChangeNode = document.querySelector(".js-limit-image");
const popupNode = document.querySelector(".js-popup");
const popupFormNode = document.querySelector(".js-popup-form");
const popupInputNode = document.querySelector(".js-popup-input");
const popupSubmitNode = document.querySelector(".js-popup-submit");
const popupCloseNode = document.querySelector(".js-popup-close");

let expenses = [];

init();

buttonNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();

  if (!expense) {
    if (currentCategoryNode.value === "Категория") {
      alert("Выберите категорию");
    }
    return;
  }

  trackExpense(expense);
  saveExpensesToLocalStorage();

  render();
});

clearButtonNode.addEventListener("click", function () {
  expenses = [];
  saveExpensesToLocalStorage();
  render();
});

limitChangeNode.addEventListener("click", openPopup);
popupFormNode.addEventListener("submit", changeLimit);
popupCloseNode.addEventListener("click", closePopup);

function init() {
  loadExpensesFromLocalStorage();
  currentLimit = loadLimitFromLocalStorage(); // Загрузка сохраненного значения лимита из локального хранилища
  limitNode.innerText = currentLimit; // Используем текущий лимит для отображения
  statusNode.innerText = STATUS_IN_LIMIT;
  render();
}

function trackExpense(expense) {
  expenses.push({ category: currentCategoryNode.value, amount: expense });
}

function getExpenseFromUser() {
  if (!inputNode.value || currentCategoryNode.value === "Категория") {
    return null;
  }

  const expense = parseInt(inputNode.value);

  clearInput();

  return expense;
}

function clearInput() {
  inputNode.value = "";
}

function calculateExpenses() {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element.amount;
  });

  return sum;
}

function render() {
  const sum = calculateExpenses();

  renderHistory();
  renderSum(sum);
  renderStatus(sum);
}

function renderHistory() {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element.category}: ${element.amount} ${CURRENCY}</li>`;
  });

  historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

function renderSum(sum) {
  sumNode.innerText = sum;
}

function renderStatus(totalSum) {
  statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);

  if (totalSum <= currentLimit) {
    // Используем текущий лимит для проверки
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      currentLimit - totalSum
    } ${CURRENCY})`; // Используем текущий лимит для отображения
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

function openPopup() {
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
    saveLimitToLocalStorage(currentLimit); // Сохраняем новое значение лимита в локальное хранилище
    limitNode.innerText = currentLimit; // Используем текущий лимит для отображения
    render();
    closePopup();
  }
}

function saveExpensesToLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpensesFromLocalStorage() {
  const storedExpenses = localStorage.getItem("expenses");
  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
  }
}

function saveLimitToLocalStorage(limit) {
  localStorage.setItem("limit", limit.toString());
}

function loadLimitFromLocalStorage() {
  const storedLimit = localStorage.getItem("limit");
  if (storedLimit) {
    return parseInt(storedLimit);
  }
  return LIMIT;
}

//////////////------------------------------/////////////////////

function getExpenseFromUser() {
  const expense = expensesInputNode.value;
  return {
    expense,
  };
}

function addExpense(expense) {
  expenses.push();
}

function getExpenses() {
  return expenses;
}

function renderExpenses() {
  const expenses = getExpenses();
  let expensesHTML = "";

  expenses.forEach((expense) => {
    expensesHTML += `
          <li class="expense">
            <p class="expenses__value">${expense}></p>
          </li>
         `;
  });

  expensesNode.innerHTML = expensesHTML;
}

// function renderExpenses(expenses) {
//   expensesListHTML = "";

//   expenses.forEach((newExpense) => {
//     expensesListHTML += `<li class="expense">${newExpense}</li>`; // сокращенная запись работы с циклом
//     newExpense.innerText = `${expense} - ${newCategory}`;
//   });
//   expensesNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
// }

// перенес в index.js в виде const
//-! + after writing line 68 uncaught error dissapeared
//function calculateExpenses() {
//  let sum = 0;
//  expenses.forEach((element) => {
//    sum += element;
//  });
//  return sum;
//}
