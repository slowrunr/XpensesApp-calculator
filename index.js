// порядок расположение констант. Сначала основные и не изменяемые (строковые константы - string)
const LIMIT = 10000;
const CURRENCY = "\u20bd";
//08.2023//Happy Birthday my son!!!//
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
  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
};

// далее указываем, что отображается в HTML через JS или объединяем всё в функцию init(App)
initApp();

addSumBtnNode.addEventListener("click", addSumBtnHandler);
clearHistoryBtnNode.addEventListener("click", clearHistoryBtnHandler);
