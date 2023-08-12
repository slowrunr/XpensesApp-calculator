// порядок расположение констант. Сначала основные и не изменяемые (строковые константы - string)
let LIMIT = 10000;
let currentLimit = LIMIT;
const CURRENCY = "\u20bd";
const STATUS_IN_LIMIT = " Всё хорошо";
const STATUS_OUT_OF_LIMIT = " Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";

// далее переменные для работы с HTML
const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const clearHistoryBtnNode = document.getElementById("clearHistoryBtn");
const expensesNode = document.getElementById("expenses");
const expenseCategoryNode = document.getElementById("categoryInput");
const sumUpNode = document.getElementById("sumUp");
const statusNode = document.getElementById("status");
// получаем лимит из этой переменной
const moneyLimitNode = document.getElementById("moneyLimit");
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

// привязка функций-обработчиков к кнопкам
addSumBtnNode.addEventListener("click", addSumBtnHandler);
clearHistoryBtnNode.addEventListener("click", clearHistoryBtnHandler);

//+
function initApp(expenses) {
  moneyLimitNode.innerText = LIMIT + ` ${CURRENCY}`;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumUpNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;
}

//+
function addSumBtnHandler() {
  const expense = getExpenseFromUser();
  if (!expense) {
    return;
  }
  const newCategory = getCategoryFromUser();
  if (newCategory === "Укажите категорию") {
    return;
  }

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
}

//+
function getExpenseFromUser() {
  if (!expensesInputNode.value === "") {
    return null;
  }

  const expense = parseInt(expensesInputNode.value);
  // для работы с дробными числами можно заменить parseInt -> parseFloat
  clearInput();
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
  sumUpNode.innerText = calculateExpenses(expenses);
}

//+
function renderStatus() {
  const sum = calculateExpenses();
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      LIMIT - sum
    } ${CURRENCY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    moneyLimitNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}

//+
function show(a) {
  document.querySelector(".category__input").value = a;
}
let dropdown = document.querySelector(".dropdown");
dropdown.onclick = function () {
  dropdown.classList.toggle("active");
};
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

//08.2023//Happy Birthday my son!!!//
