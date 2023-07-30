const expenses = [];
const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const expensesNode = document.getElementById("expenses");

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
    // цикл forEach нужен, чтобы поработать с каждым элементом списка и что-то в нём изменить
    // - полная запись работы с элементом, но можно сократить.
    // const elementHTML = `<li>${element}</li>;
    //expensesListHtml += elementHTML;
    expensesListHTML += `<li>${element}</li>`; // сокращенная запись работы с циклом
  });
  expensesNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
});
