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
const reviseLimitBtnNode = document.getElementById("reviseLimitBtn");
const expensesNode = document.getElementById("expenses");
const expenseCategoryNode = document.getElementById("categoryInput");
const sumUpNode = document.getElementById("sumUp");
const statusNode = document.getElementById("status");
// получаем лимит из этой переменной
const moneyLimitNode = document.getElementById("moneyLimit");
// переменные с массивами
let currentLimit = DEFAULT_LIMIT;
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
  renderExpenses(expenses);
  clearInput();
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
  removeStatusRed();
  const sum = calculateExpenses();
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
reviseLimitBtnNode.addEventListener("click", reviseLimitHandler);
moneyLimitNode.addEventListener("click", reviseLimitHandler);
clearHistoryBtnNode.addEventListener("click", clearHistoryBtnHandler);

//08.2023//Happy Birthday my son!!!//
