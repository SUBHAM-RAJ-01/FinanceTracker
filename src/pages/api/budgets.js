// pages/api/budgets.js
import { connectToDB } from '../../utils/helpers';  // ✅ fixed path
import Budget from '../../models/Budget';           // ✅ fixed path
import { getBudgets, saveBudget } from '../../utils/storage';  // ✅ fixed path

export default async function handler(req, res) {
  await connectToDB();  // Ensure the DB is connected

  try {
    switch (req.method) {
      case 'GET':
        const budget = await getBudgets();
        return res.status(200).json({ data: budget });

      case 'POST':
        const { category, amount } = req.body;

        if (!category || !amount) {
          return res.status(400).json({ error: 'Category and amount are required' });
        }

        const updatedBudget = await saveBudget(category, amount);
        return res.status(200).json({ data: updatedBudget });

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Budgets API Error:', error);
    return res.status(500).json({
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
