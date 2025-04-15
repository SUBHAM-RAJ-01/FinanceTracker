// models/Budget.js
import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema({
  food: { type: Number, default: 0 },
  transport: { type: Number, default: 0 },
  housing: { type: Number, default: 0 },
  entertainment: { type: Number, default: 0 },
  other: { type: Number, default: 0 },
}, { strict: false });  // Allows for dynamic fields

// Prevent model recompilation in development
if (mongoose.models?.Budget) {
  delete mongoose.models.Budget;
}

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
