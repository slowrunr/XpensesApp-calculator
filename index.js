// порядок расположение констант. Сначала основные и не изменяемые
const LIMIT = 10000;
const CURRENCY = "\u20bd";
//Happy Birthday my son!!!
const STATUS_IN_LIMIT = " Всё хорошо";
const STATUS_OUT_OF_LIMIT = " Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";
// далее переменные для работы с HTML
const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const clearHistoryBtnNode = document.getElementById("clearHistoryBtn");
const expensesNode = document.getElementById("expenses");
const sumUpNode = document.getElementById("sumUp");
const moneyLimitNode = document.getElementById("moneyLimit");
const statusNode = document.getElementById("status");
// вместо строчки function calculateExpenses() =
const calculateExpenses = () => {
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
};
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
