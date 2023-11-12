const expenses = document.querySelector('.expenses');
let monthlyExpenseElement = document.querySelector('.monthlyExpense');
const expenseInput = document.querySelector('.expenseInput');
const expenseAmount = document.querySelector('.expenseAmount');
const catList = document.querySelectorAll('.catList');
const saveBtn = document.querySelector('.save');
let dayElement = document.querySelector('.day');

function addTask() {                                                                         
  const expenseName = expenseInput.value;
  const expenseNumber = parseFloat(expenseAmount.value) || 0;

  if (expenseName && expenseNumber) {
    const newExpense = document.createElement("div");
    newExpense.classList.add("newExpense-content", "flex-space");
    newExpense.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseNumber}</p>`;

    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "1em";
    editButton.addEventListener("click", () => {
      modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "1em";
    deleteButton.addEventListener("click", () => {
      expenses.removeChild(newExpense); 
      monthlyExpenseElement.innerHTML = parseFloat(monthlyExpenseElement.innerHTML) - expenseNumber;
    });

    newExpense.appendChild(editButton);
    newExpense.appendChild(deleteButton);
    expenses.appendChild(newExpense);


    monthlyExpenseElement.innerHTML = parseFloat(monthlyExpenseElement.innerHTML) + expenseNumber;
     
    updateDay();

    expenseInput.value = '';
    expenseAmount.value = '';

    localStorage.setItem('expenses', JSON.stringify(expenses.innerHTML))
    localStorage.setItem('monthlyExpenseElement' , JSON.stringify(monthlyExpenseElement.innerHTML));
  }
}
window.onload = function() {    
  const storedExpense = localStorage.getItem('expenses');
  const storedMonthlyExpense =localStorage.getItem('monthlyExpenseElement');
  if (storedExpense && storedMonthlyExpense) {
      expenses.innerHTML = JSON.parse(storedExpense);  
      monthlyExpenseElement.innerHTML=JSON.parse(storedMonthlyExpense);
    }
};


function updateDay() {
  const currentDate = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  dayElement.innerHTML = formattedDate;
}

updateDay();