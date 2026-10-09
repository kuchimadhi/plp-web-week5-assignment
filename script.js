const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const expenseCategories = ['Rent', 'Groceries', 'Transport', 'Utilities', 'Entertainment'];

function calculateTotalExpenses(expenseList) {
  return expenseList.reduce((total, expense) => total + expense.amount, 0);
}

function calculateRemainingBalance(income, totalExpenses) {
  return income - totalExpenses;
}

function collectExpense(name) {
  const amount = Number(prompt(`Enter your monthly ${name.toLowerCase()} expense:`, '0'));

  if (Number.isNaN(amount) || amount < 0) {
    alert(`Please enter a valid number for ${name}.`);
    return collectExpense(name);
  }

  return { name, amount };
}

function showBudgetSummary(income, expenses) {
  const totalExpenses = calculateTotalExpenses(expenses);
  const remainingBalance = calculateRemainingBalance(income, totalExpenses);

  const summary = [
    'SpendWise Budget Summary',
    `Monthly income: ${currencyFormatter.format(income)}`,
    `Total expenses: ${currencyFormatter.format(totalExpenses)}`,
    `Remaining balance: ${currencyFormatter.format(remainingBalance)}`,
    '',
    'Expense breakdown:'
  ];

  expenses.forEach((expense) => {
    summary.push(`- ${expense.name}: ${currencyFormatter.format(expense.amount)}`);
  });

  console.log(summary.join('\n'));

  const summaryBox = document.getElementById('summary');
  if (summaryBox) {
    summaryBox.innerHTML = `
      <strong>Monthly income:</strong> ${currencyFormatter.format(income)}<br>
      <strong>Total expenses:</strong> ${currencyFormatter.format(totalExpenses)}<br>
      <strong>Remaining balance:</strong> <span class="${remainingBalance >= 0 ? 'amount-positive' : 'amount-negative'}">${currencyFormatter.format(remainingBalance)}</span><br><br>
      <strong>Expense breakdown:</strong><br>
      ${expenses.map((expense) => `• ${expense.name}: ${currencyFormatter.format(expense.amount)}`).join('<br>')}
    `;
  }
}

function buildFormExpenses() {
  const container = document.getElementById('expense-fields');
  if (!container) {
    return;
  }

  container.innerHTML = '';
  expenseCategories.forEach((category) => {
    const label = document.createElement('label');
    label.className = 'expense-group';
    label.innerHTML = `
      <span>${category}</span>
      <input type="number" min="0" step="0.01" name="${category.toLowerCase()}" placeholder="0.00" required />
    `;
    container.appendChild(label);
  });
}

function parseExpenseData(formData) {
  const expenses = expenseCategories.map((category) => {
    const amount = Number(formData.get(category.toLowerCase()));
    return { name: category, amount: Number.isNaN(amount) ? 0 : amount };
  });

  return expenses;
}

function runBudgetPlanner() {
  const canUsePrompt = (() => {
    try {
      if (typeof window.prompt !== 'function') {
        return false;
      }
      window.prompt('');
      return true;
    } catch (error) {
      return false;
    }
  })();

  if (!canUsePrompt) {
    const formContainer = document.getElementById('budget-form-container');
    const summaryBox = document.getElementById('summary');
    buildFormExpenses();
    formContainer.classList.remove('hidden');
    summaryBox.textContent = 'Please enter your budget details below.';

    document.getElementById('budget-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const monthlyIncome = Number(formData.get('monthly-income'));
      const expenses = parseExpenseData(formData);

      if (Number.isNaN(monthlyIncome) || monthlyIncome <= 0) {
        alert('Income must be a valid positive number.');
        return;
      }

      showBudgetSummary(monthlyIncome, expenses);
    });
    return;
  }

  const monthlyIncome = Number(prompt('Enter your monthly income:', '2500'));

  if (Number.isNaN(monthlyIncome) || monthlyIncome <= 0) {
    alert('Income must be a valid positive number.');
    return;
  }

  const expenses = expenseCategories.map((expenseName) => collectExpense(expenseName));
  showBudgetSummary(monthlyIncome, expenses);
}

window.addEventListener('DOMContentLoaded', runBudgetPlanner);
