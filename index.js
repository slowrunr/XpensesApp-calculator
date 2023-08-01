// порядок расположение констант. Сначала основные и не изменяемые
const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = " Всё хорошо";
const STATUS_OUT_OF_LIMIT = " Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";
// далее переменные для работы с HTML
const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const expensesNode = document.getElementById("expenses");
const sumUpNode = document.getElementById("sumUp");
const moneyLimitNode = document.getElementById("moneyLimit");
const statusNode = document.getElementById("status");
// переменные с массивами
const expenses = [];
// далее указываем, что отображается в HTML через JS или объединяем всё в функцию init(App)
initApp();

addSumBtnNode.addEventListener("click", function () {
  const expense = getExpenseFromUser();
  if (!expense) {
    return;
  }

  trackExpense(expense);

  renderExpenses(expenses);
  renderSum(expenses);
  renderStatus(expenses);
});

//+
function initApp(expenses) {
  moneyLimitNode.innerText = LIMIT;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumUpNode.innerText = calculateExpenses(expenses);
}

//+
function getExpenseFromUser() {
  if (!expensesInputNode.value === "") {
    return null;
  }

  const expense = parseInt(expensesInputNode.value);
  clearInput();
  return expense;
}

//+
function clearInput() {
  expensesInputNode.value = "";
}

//+
function trackExpense(expense) {
  expenses.push(expense);
}

//-! + after writing line 68 uncaught error dissapeared
function calculateExpenses() {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

//+
function renderExpenses(expenses) {
  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`; // сокращенная запись работы с циклом
  });
  expensesNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

//+
function renderSum(expenses) {
  sumUpNode.innerText = calculateExpenses(expenses);
}

//+
function renderStatus(expenses) {
  const sum = calculateExpenses(expenses);
  if (sum <= LIMIT) {
    statusNode.innerText = STATUS_IN_LIMIT;
  } else {
    statusNode.innerText = STATUS_OUT_OF_LIMIT;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
