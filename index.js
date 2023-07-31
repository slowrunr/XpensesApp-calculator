const LIMIT = 10000;
const expenses = [];
const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const expensesNode = document.getElementById("expenses");
const sumUpNode = document.getElementById("sumUp");
const moneyLimitNode = document.getElementById("moneyLimit");

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
});
