// pages/api/transactions.js
import { connectToDB } from '../../../utils/helpers';  // Ensure DB is connected
import Transaction from '../../../models/Transaction';  // Import the Transaction model
import { getTransactions, saveTransaction, deleteTransaction } from '../../../utils/storage';  // Import MongoDB-based functions

export default async function handler(req, res) {
  await connectToDB();  // Ensure the DB connection is established
  
  try {
    switch (req.method) {
      case 'GET':
        // Fetch transactions from MongoDB
        const transactions = await getTransactions();
        return res.status(200).json({ data: transactions });

      case 'POST':
        const { amount, description, category, type } = req.body;
        if (!amount || !description || !category || !type) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create and save the new transaction
        const newTransaction = await saveTransaction({ amount, description, category, type });
        return res.status(201).json(newTransaction);

      case 'DELETE':
        const { id } = req.query;  // Get the transaction ID from query
        if (!id) {
          return res.status(400).json({ error: 'Transaction ID is required' });
        }

        const success = await deleteTransaction(id);  // Delete the transaction
        if (success) {
          return res.status(200).json({ message: 'Transaction deleted successfully' });
        } else {
          return res.status(404).json({ error: 'Transaction not found' });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Storage API Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
