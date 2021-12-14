const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const money_minus = document.getElementById("money-minus");

// const randomTransations=[
//     {id:1,text:'salary',amount:400},
//     {id:2,text:'books',amount:-50},
//     {id:3,text:'paper',amount:-20},
//     {id:4,text:'food',amount:-100},
// ]
const localStorageTransations = JSON.parse(localStorage.getItem("transations"));

let transations =
  localStorage.getItem("transations") !== null ? localStorageTransations : [];

//add transation
function addTransation(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "please add a text";
    text.style.backgroundColor = "#ccc";
    amount.placeholder = "please add amount";
    amount.style.backgroundColor = "#ccc";
  } else {
    const transation = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };
    transations.push(transation);
    addTransationDOM(transation);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
//generate id
function genenrateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transations to dom list
function addTransationDOM(transation) {
  //get sign
  const sign = transation.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  //add class based on value
  item.classList.add(transation.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transation.text} <span>${sign}${Math.abs(
    transation.amount
  )}</span> <button class="delete-btn" onclick="removeTransation(${
    transation.id
  })">x</button>`;
  list.appendChild(item);
}
//update the balance
function updateValues() {
  const amounts = transations.map((transation) => transation.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}
//remove
function removeTransation(id) {
  transations = transations.filter((transation) => transation.id !== id);
  updateLocalStorage();
  init();
}

//updatelocal storage
function updateLocalStorage() {
  localStorage.setItem("transations", JSON.stringify(transations));
}

//init
function init() {
  list.innerHTML = "";
  transations.forEach(addTransationDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransation);

// <block:actions:2>
const actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = Utils.numbers({count: chart.data.labels.length, min: 0, max: 100});
        });
        chart.update();
      }
    },
    {
      name: 'Add Dataset',
      handler(chart) {
        const data = chart.data;
        const newDataset = {
          label: 'Dataset ' + (data.datasets.length + 1),
          backgroundColor: [],
          data: [],
        };
  
        for (let i = 0; i < data.labels.length; i++) {
          newDataset.data.push(Utils.numbers({count: 1, min: 0, max: 100}));
  
          const colorIndex = i % Object.keys(Utils.CHART_COLORS).length;
          newDataset.backgroundColor.push(Object.values(Utils.CHART_COLORS)[colorIndex]);
        }
  
        chart.data.datasets.push(newDataset);
        chart.update();
      }
    },
    {
      name: 'Add Data',
      handler(chart) {
        const data = chart.data;
        if (data.datasets.length > 0) {
          data.labels.push('data #' + (data.labels.length + 1));
  
          for (let index = 0; index < data.datasets.length; ++index) {
            data.datasets[index].data.push(Utils.rand(0, 100));
          }
  
          chart.update();
        }
      }
    },
    {
      name: 'Remove Dataset',
      handler(chart) {
        chart.data.datasets.pop();
        chart.update();
      }
    },
    {
      name: 'Remove Data',
      handler(chart) {
        chart.data.labels.splice(-1, 1); // remove the label first
  
        chart.data.datasets.forEach(dataset => {
          dataset.data.pop();
        });
  
        chart.update();
      }
    }
  ];
  // </block:actions>
  
  // <block:setup:1>
  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
  
  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  };
  // </block:setup>
  
  // <block:config:0>
  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };
  // </block:config>
  
  module.exports = {
    actions: actions,
    config: config,
  };