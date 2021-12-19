const topCard = document.getElementsByClassName("top_card")[0];

const currencyHolder = document.getElementById("currency");
const currentBalanceHolder = document.getElementById("balance");
const tnxNameHolder = document.getElementById("name");
const tnxAmountHolder = document.getElementById("amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const saveButton = document.getElementById("save");
const displayList = document.getElementById("list_of_transaction");

let symbol = "R";

var listOfTransaction = JSON.parse(window.localStorage.getItem("list")) || [];

let currentBalance = 0;
let editIndex = -1;

function edit(i) {
  tnxNameHolder.value = listOfTransaction[i].name;
  tnxAmountHolder.value = listOfTransaction[i].amount;
  if (listOfTransaction[i].type == "income") {
    income.checked = true;
  } else {
    expense.checked = true;
  }
}

function del(i) {
  listOfTransaction = listOfTransaction.filter((e, index) => i !== index);
  render();
}

function saveData() {
  localStorage.setItem("symbol", symbol);
  localStorage.setItem("balance", currentBalance);

  localStorage.setItem("list", JSON.stringify(listOfTransaction));
}

function loadData() {
  symbol = localStorage.setItem("symbol");
  currentBalance = Number(JsolocalStorage.setItem("balance"));
  listOfTransaction = JSON.parse(localStorage.setItem("list"));
}

function render(firstLoad = true) {
  let currentBalance = 0;

  console.log(listOfTransaction);
  let currentExpenses = listOfTransaction.reduce(function (total, value) {
    return value.type == "expense" ? total + value.amount : total + 0;
  }, 0);

  let currentIncome = listOfTransaction.reduce(function (total, value) {
    return value.type == "income" ? total + value.amount : total + 0;
  }, 0);

  currentBalance = listOfTransaction.reduce(function (total, value) {
    return value.type == "income" ? total + value.amount : total - value.amount;
  }, 0);

  console.log("List of expenses is ", currentExpenses);

  displayList.innerHTML = "";

  if (listOfTransaction.length == 0) {
    displayList.innerHTML += "No Transactions found!";
  } else {
    listOfTransaction.map((e, i) => {
      displayList.innerHTML += `
    <li class='transaction ${e.type == "income" ? "income" : "expense"}' >
      <p>${e.name}</p>
    <div class="right_side">
      <p>${symbol + " " + e.amount}</p>
      <button onclick="del(${i})"><i class="fa-thin fa-trash-can"></i>Delete</button>
    </div>
  </li>`;
    });
  }

  currencyHolder.innerHTML = symbol;
  currentBalanceHolder.innerHTML = currentBalance;
  if (!firstLoad) {
    saveData();
  }

  new Chart("transactionsPieChart", {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          label: "Expense Breakdown",
          data: [currentIncome, currentExpenses],
          backgroundColor: ["rgb(255,99,132)", "rgb(54,162,235)"],
          hoverOffset: 4,
        },
      ],
    },
  });
}

saveButton.addEventListener("click", function () {
  if (tnxNameHolder.value == "" || tnxAmountHolder.value <= 0) {
    alert("can't do that!");
    return;
  }
  let transaction = {
    name: tnxNameHolder.value,
    amount: Number(tnxAmountHolder.value),
    type: income.checked ? "income" : "expense",
  };

  if (editIndex == -1) {
    console.log("Editing");
    listOfTransaction.push(transaction);
  } else {
    console.log("Not Editing");
    listOfTransaction[editIndex] = transaction;
  }
  editIndex = -1;
  tnxNameHolder.value = "";
  tnxAmountHolder.value = "";

  render((firstLoad = false));
});

render();
