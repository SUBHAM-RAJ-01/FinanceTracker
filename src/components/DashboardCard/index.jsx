import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import styles from './styles.module.css';

export default function DashboardCard() {
  const { transactions = [], budgets = {} } = useContext(FinanceContext);

  // Calculate totals with proper fallbacks
  const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalBudget = Object.values(budgets).reduce((sum, b) => sum + (b || 0), 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Total Spent</h3>
        <p className={styles.amount}>₹{totalSpent.toFixed(2)}</p>
      </div>
      <div className={styles.card}>
        <h3>Total Budget</h3>
        <p className={styles.amount}>₹{totalBudget.toFixed(2)}</p>
      </div>
      <div className={styles.card}>
        <h3>Remaining</h3>
        <p 
          className={styles.amount} 
          style={{ 
            color: remaining < 0 ? 'var(--error)' : 'var(--success)'
          }}
        >
          ₹{Math.abs(remaining).toFixed(2)} {remaining < 0 ? 'Over' : 'Left'}
        </p>
      </div>
    </div>
  );
}