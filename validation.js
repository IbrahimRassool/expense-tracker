const currencyHolder = document.getElementById("currency");
const balance = document.getElementById("balance");
const tnxNameHolder = document.getElementById("name");
const tnxAmountHolder = document.getElementById("amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const saveButton = document.getElementById("save");
const displayList = document.getElementById("list_of_transactions");

let symbol="R";
let listOfTransaction=[];
let currentBalance= 0;

function render(){
  currentBalance = listOfTransaction.reduce((total,value)=>{return total+value}, 0);


 displayList="";

 if(listOfTransaction.length=0){
   displayList.innerHTML+="No Transactions found!"
 }

 else{
   listOfTransaction.forEach((e,i)=>{
     displayList.innerHTML+= ' 
     <li class="transaction R{e.type}" >
       <p>R{e.name}</p>
     <div class="right_side">
       <p>R{symbol}R{e.amount}</p>
       <button><i class="fa-solid fa-pen-to-square"></i></button>
       <button><i class="fa-thin fa-trash-can"></i></button>
     </div>
   </li>';
   })
 }


  currencyHolder.innerHTML="symbol"
  balanceHolder.innerHTML="currentBalance"
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

  console.log(transaction)
  listOfTransaction.push(transaction);
})

render()