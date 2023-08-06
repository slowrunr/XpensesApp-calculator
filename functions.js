//+
function initApp(expenses) {
  moneyLimitNode.innerText = LIMIT + ` ${CURRENCY}`;
  statusNode.innerText = STATUS_IN_LIMIT;
  sumUpNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;
}

//+
function getExpenseFromUser() {
  if (!expensesInputNode.value === "") {
    return null;
  }

  const expense = parseFloat(expensesInputNode.value);
  //replaced parseInt -> parseFloat
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

// перенес в index.js в виде const
//-! + after writing line 68 uncaught error dissapeared
//function calculateExpenses() {
//  let sum = 0;
//  expenses.forEach((element) => {
//    sum += element;
//  });
//  return sum;
//}

//+
function renderExpenses(expenses) {
  let expensesListHTML = "";
  expenses.forEach((element) => {
    expensesListHTML += `<li class="expense">${element} ${CURRENCY}</li>`; // сокращенная запись работы с циклом
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
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${
      LIMIT - sum
    } ${CURRENCY})`;
    statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    moneyLimitNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
  }
}
