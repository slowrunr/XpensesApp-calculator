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
