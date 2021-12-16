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
  currentBalance = listOfTransaction.reduce((total,value)=>{return total+value}, 0)


 displayList="";

 if(listOfTransaction.length=0){
   displayList.innerHTML+="No Transactions found!"
 }

 else{
   listOfTransaction.forEach((e,i)=>{
     displayList.innerHTML+= e;
   })
 }


  currencyHolder.innerHTML="symbol"
  balanceHolder.innerHTML="currentBalance"
}

render()