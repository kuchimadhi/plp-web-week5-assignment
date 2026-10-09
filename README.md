# SpendWise

SpendWise is a simple personal budgeting app that helps users track income and expenses. It gathers monthly income and expected expenses, calculates the total costs, and shows the remaining balance so the user knows how much money is left after spending.

## JavaScript concepts implemented

This project uses several core JavaScript concepts:

- Variables: income, expense totals, and remaining balance are stored in variables.
- Data types: numbers are used for monetary values, and arrays/objects store expense information.
- User input: the app uses `prompt()` to collect income and expense details from the user.
- Calculations: totals and remaining balance are calculated using arithmetic operations.
- Functions: reusable functions organize the code for expense collection, total calculation, and summary display.
- DOM updates: JavaScript writes the results into the HTML content so the results appear in the browser.

## How variables are used

The program creates variables such as:

- `monthlyIncome` to store the user's income.
- `expenseCategories` to hold the names of major budget categories.
- `expenses` to store an array of objects containing expense names and amounts.
- `remainingBalance` to keep the final calculation result.

## How user input is collected

The app uses JavaScript `prompt()` to ask the user for values. The user enters their monthly income and the amount spent on each category, such as rent, groceries, and utilities. These values are then stored in variables for processing.

## How calculations are performed

The budget logic is calculated using functions:

- `calculateTotalExpenses(expenseList)` adds all expense amounts.
- `calculateRemainingBalance(income, totalExpenses)` subtracts total spending from income.

This makes it easy to calculate the remaining balance after the budget is entered.

## How functions help organize the code

The program is structured with small, reusable functions to keep the logic simple and clean:

- `collectExpense(name)` asks for one expense value and validates it.
- `showBudgetSummary(income, expenses)` displays the totals and breakdown in the console and on the page.
- `runBudgetPlanner()` starts the full budgeting flow.

These functions make the application easier to read, update, and reuse.

## How to run the project

1. Open `index.html` in a browser.
2. Enter your monthly income when prompted.
3. Enter your spending amounts for each expense category.
4. Review the budget summary in the browser and in the console.
