import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import styles from './styles.module.css';

export default function BudgetComparison() {
  const { transactions = [], budgets = {}, categories = [], updateBudget } = useContext(FinanceContext);

  const getCategorySpending = (categoryName) => {
    return transactions
      .filter(t => t.category === categoryName)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  };

  return (
    <div className={styles.container}>
      <h2>Budget vs Spending</h2>
      {categories.length > 0 ? (
        <div className={styles.grid}>
          {categories.map(category => {
            const spent = getCategorySpending(category.name);
            const budget = budgets[category.name] || 0;
            const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

            return (
              <div key={category.id} className={styles.card}>
                <div className={styles.header}>
                  <span style={{ color: category.color }}>{category.icon}</span>
                  <h3>{category.name}</h3>
                </div>
                <div className={styles.progressContainer}>
                  <div 
                    className={styles.progressBar}
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: percentage > 90 ? 'var(--error)' : category.color
                    }}
                  ></div>
                </div>
                <div className={styles.numbers}>
                  <span>₹{spent.toFixed(2)}</span>
                  <span>of ₹{budget.toFixed(2)}</span>
                </div>
                <input
                  type="number"
                  placeholder="Set budget"
                  value={budget || ''}
                  onChange={(e) => updateBudget(category.name, parseFloat(e.target.value || 0))}
                  className={styles.input}
                  min="0"
                  step="0.01"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
}