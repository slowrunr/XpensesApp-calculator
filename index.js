const LIMIT = 10000;
const CURRENCY = "руб.";
const STATUS_IN_LIMIT = " Всё хорошо";
const STATUS_OUT_OF_LIMIT = " Всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status__red";

const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const expensesNode = document.getElementById("expenses");
const sumUpNode = document.getElementById("sumUp");
const moneyLimitNode = document.getElementById("moneyLimit");
const statusNode = document.getElementById("status");

const expenses = [];

moneyLimitNode.innerText = LIMIT;

addSumBtnNode.addEventListener("click", function () {
  //1. receive data from input
  if (!expensesInputNode.value === "") {
    return;
  }

  const expense = parseInt(expensesInputNode.value);
  expensesInputNode.value = "";

  //2. save data
  expenses.push(expense);
  console.log(expenses);

  //3. render list of expenses
  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li>${element}</li> руб.`; // сокращенная запись работы с циклом
  });
  // цикл forEach нужен, чтобы поработать с каждым элементом списка и что-то в нём изменить
  // - полная запись работы с элементом, но можно сократить.
  // const elementHTML = `<li>${element}</li>;
  //expensesListHtml += elementHTML;
  expensesNode.innerHTML = `<ol>${expensesListHTML}</ol>`;

  //4. sum up and render total
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;
  });
  //console.log(sum);

  sumUpNode.innerText = sum;

  //5. compare limit with total and render condition
  if (sum <= LIMIT) {
    statusNode.innerText = " Всё хорошо";
  } else {
    statusNode.innerText = " Всё плохо";
    statusNode.classList.add("status__red");
  }
});
