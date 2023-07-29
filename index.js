const expenses = [];
const expensesInputNode = document.getElementById("expensesInput");
const addSumBtnNode = document.getElementById("addSumBtn");
const expensesNode = document.getElementById("expenses");

addSumBtnNode.addEventListener("click", function () {
  const expense = expensesInputNode.value;
  expenses.push(expense);
  console.log(expenses);
  //addExpense(expensesFromUser);
  //renderExpenses();
});
