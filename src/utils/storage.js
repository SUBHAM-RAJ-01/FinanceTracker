// // utils/storage.js
// export async function getTransactions() {
//   const res = await fetch('/api/transactions');
//   if (!res.ok) throw new Error('Failed to fetch transactions');
//   const json = await res.json();
//   return json.data;
// }

// export async function saveTransaction(transaction) {
//   const res = await fetch('/api/transactions', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(transaction),
//   });
//   if (!res.ok) throw new Error('Failed to save transaction');
//   return await res.json();
// }

// export async function deleteTransaction(id) {
//   const res = await fetch(`/api/transactions?id=${id}`, {
//     method: 'DELETE',
//   });
//   if (!res.ok) throw new Error('Failed to delete transaction');
//   return true;
// }

// export async function getBudgets() {
//   const res = await fetch('/api/budgets');
//   if (!res.ok) throw new Error('Failed to fetch budgets');
//   const json = await res.json();
//   return json.data;
// }

// export async function saveBudget(category, amount) {
//   const res = await fetch('/api/budgets', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ category, amount }),
//   });
//   if (!res.ok) throw new Error('Failed to save budget');
//   return await res.json();
// }
