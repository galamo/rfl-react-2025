import React from 'react';

const ExpensesTable = ({ data }) => {
return (
<div className="overflow-x-auto shadow-md rounded-lg">
<table className="min-w-full bg-white">
<thead className="bg-blue-600 text-white">
<tr>
<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">ID</th>
<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Date</th>
<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Category</th>
<th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Description</th>
<th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">Amount</th>
</tr>
</thead>
<tbody className="divide-y divide-gray-200">
{data.map((expense, index) => (
<tr
key={expense.id}
className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`} >
<td className="px-6 py-4 text-sm text-gray-900">{expense.id}</td>
<td className="px-6 py-4 text-sm text-gray-900">{expense.date}</td>
<td className="px-6 py-4 text-sm">
<span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
{expense.category}
</span>
</td>
<td className="px-6 py-4 text-sm text-gray-900">{expense.description}</td>
<td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
${expense.amount.toFixed(2)}
</td>
</tr>
))}
</tbody>
</table>
</div>
);
};

const ExpensesPage = () => {
const expensesData = {
data: [
{
id: 1,
amount: 125.5,
date: "2025-09-20",
category: "Food",
description: "Grocery shopping"
}
]
};

return (
<div className="min-h-screen bg-gray-100 py-8 px-4">
<div className="max-w-6xl mx-auto">
<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-900 mb-2">Expenses Manager</h1>
<p className="text-gray-600">Track and manage your expenses</p>
</div>

        <ExpensesTable data={expensesData.data} />

        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total Expenses: {expensesData.data.length}</span>
            <span className="font-semibold text-gray-900">
              Total Amount: ${expensesData.data.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>

);
};

export default ExpensesPage;
