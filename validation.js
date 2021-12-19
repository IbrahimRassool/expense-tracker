const topCard = document.getElementsByClassName("top_card")[0]
const currencyHolder = document.getElementById("currency");
const currentBalanceHolder = document.getElementById("balance");
const tnxNameHolder = document.getElementById("name");
const tnxAmountHolder = document.getElementById("amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const saveButton = document.getElementById("save");
const displayList = document.getElementById("list_of_transactions");
const cancelEditButton = document.getElementById("cancel_edit");

let symbol="R";
let listOfTransaction=[];
let currentBalance= 0;


function edit(i){
editIndex=i;
tnxNameHolder.value=listOfTransaction[i].name;
tnxAmountHolder.value=listOfTransaction[i].amount;
if(listOfTransaction[i].type=="income"){income.checked= true
}
else{
  expense.checked=true
}
}

function del(i){
listOfTransaction=listOfTransaction.filter((e, index) => i !== index);
render()

}

function saveData(){
  localStorage.setItem("symbol", symbol);
  localStorage.setItem("balance", currentBalance);
  localStorage.setItem("list", JSON.stringify(listOfTransaction));
}

function loadData(){
  symbol =localStorage.setItem("symbol");;
  currentBalance=Number(JsolocalStorage.setItem("balance"));;
  listOfTransaction=JSON.parse(localStorage.setItem("list"));;
}

function render(){
  currentBalance = listOfTransaction.reduce(function(total,value){
  if (amount.type==income)return (total +value)
  else return(total-value), 0})


 displayList.innerHTML="";

 if(listOfTransaction.length=0){
   displayList.innerHTML+="No Transactions found!"
 }

 else{
   listOfTransaction.forEach((e,i)=>{
     displayList.innerHTML+=
     <li class="transaction R{e.type}">
      <p>R{e.name}</p>
     <div class="right_side">
       <p>R{symbol}R{e.amount}</p>
       < button onclick="edit(R{i})"><i class="fa-solid fa-pen-to-square"></i></button>
       <button onclick="del(R{i})"><i class="fa-thin fa-trash-can"></i></button>
     </div>
   </li>
   })
 }


  currencyHolder.innerHTML="symbol"
  balanceHolder.innerHTML="currentBalance"
  saveData();
}

saveButton.addEventListener("click", () => {
if (tnxNameHolder.value=="" || tnxAmountHolder.value <= 0){
  alert("can't do that!");
  return;
}
  let transaction= {
    name: tnxNameHolder.value,
    amount: Number(tnxNameHolder.value),
    type: income.checked? "income" : "expense"
  };

  if(editIndex== -1)
    listOfTransaction.push(transaction);
  else
   listOfTransaction(editIndex)= transaction;

   editIndex=-1;
    tnxNameHolder.value="";
    tnxAmountHolder.value="";
    render();
})

render()