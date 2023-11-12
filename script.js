document.addEventListener("DOMContentLoaded", function () { //DOMContentLoaded doesnt wait for the stylesheet to loaded
    const addIncomeButton = document.getElementById("addincome");
    const addExpenseButton = document.getElementById("addexpense");
    const addClearButton = document.getElementById("clear");
    const balanceSpan = document.getElementById("balance");
    const incomeSpan = document.getElementById("income");
    const expenseSpan = document.getElementById("expense");
    const transactionList = document.getElementById("transactionList");
    const transactionNameInput = document.getElementById("transactionName");
    const transactionAmountInput = document.getElementById("transactionAmount");

    class Budget {
        constructor() { // I am Intializing all of the elements to be changed in my Budget Tracker
            this.transactions = [];
            this.balance = 0;
            this.income = 0;
            this.expense = 0;
        }
        //Method for Adding the Income
        addIncome(description, amount, date) {
            this.transactions.push({ //This line adds a new income transaction to the transactions array
                type: 'income',
                description,
                amount,
                date: date || new Date() // if a date is provided it will use that in the transition if not it will default to the current date and time
            });
            this.income += amount;
            this.balance += amount;
            this.updateUI();
        }

        //Method for Adding the Expense
        addExpense(description, amount, date) {
            this.transactions.push({
                type: 'expense',
                description,
                amount,
                date: date || new Date()
            });
            this.expense += amount;
            this.balance -= amount;
            this.updateUI();
        }

        updateUI() {
            balanceSpan.textContent = `$${this.balance.toFixed(2)}`; //toFixed convert a number to a string and added a dollar sign to show in the unorderd list
            incomeSpan.textContent = `$${this.income.toFixed(2)}`;
            expenseSpan.textContent = `$${this.expense.toFixed(2)}`;

            this.updateTransactionList();
        }
        updateTransactionList() {
            transactionList.innerHTML = '';
            this.transactions.forEach(function (transaction) {
                const listItem = document.createElement('li');
                const transactionDate = new Date(transaction.date);
                listItem.textContent = `${transaction.description}: $${transaction.amount.toFixed(2)} (${transactionDate.toDateString()}) `;
                if (transaction.type === 'income') {
                    listItem.style.color = 'green';
                } else if (transaction.type === 'expense') {
                    listItem.style.color = 'red';
                }
                transactionList.appendChild(listItem);
            });
        }
    }

    const budget = new Budget();

    addIncomeButton.addEventListener('click', function () {
        const description = transactionNameInput.value;
        const amount = parseFloat(transactionAmountInput.value);
        if (description && amount > 0) {
            budget.addIncome(description, amount);
            transactionNameInput.value = '';
            transactionAmountInput.value = '0';
        }
    });

    addExpenseButton.addEventListener('click', function () {  //if the name and the amount of the expense is greater than 0 then proeed with adding the transct
        const description = transactionNameInput.value;  //
        const amount = parseFloat(transactionAmountInput.value);
        if (description && amount > 0) {
            budget.addExpense(description, amount);
            transactionNameInput.value = '';
            transactionAmountInput.value = '0';
        }
    });
    addClearButton.addEventListener('click', function () {
        budget.transactions = [];
        budget.balance = 0;
        budget.income = 0;
        budget.expense = 0;
        budget.updateUI();
    });

});
