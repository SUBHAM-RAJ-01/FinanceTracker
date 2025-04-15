import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import styles from './styles.module.css';

export default function TransactionList() {
  const { transactions, categories, deleteTransaction } = useContext(FinanceContext);

  const getCategory = (name) => categories.find(c => c.name === name);

  return (
    <div className={styles.container}>
      <h2>Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className={styles.empty}>No transactions yet</p>
      ) : (
        <ul className={styles.list}>
          {transactions.map(t => (
            <li key={t.id} className={styles.item}>
              <div className={styles.icon} style={{ 
                backgroundColor: getCategory(t.category)?.color + '20',
                color: getCategory(t.category)?.color
              }}>
                {getCategory(t.category)?.icon}
              </div>
              <div className={styles.details}>
                <h3>{t.description}</h3>
                <p>{new Date(t.date).toLocaleDateString()}</p>
              </div>
              <div className={styles.amount}>
                ₹{t.amount.toFixed(2)}
              </div>
              <button 
                onClick={() => deleteTransaction(t.id)}
                className={styles.delete}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
