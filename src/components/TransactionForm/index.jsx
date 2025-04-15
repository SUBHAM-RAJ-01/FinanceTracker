import { useContext, useState, useEffect } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import styles from './styles.module.css';

export default function TransactionForm() {
  const { addTransaction, categories = [] } = useContext(FinanceContext);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense' // Add type field
  });

  // Set default category when component mounts
  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({
        ...prev,
        category: categories[0].name
      }));
    }
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData(prev => ({ 
      ...prev, 
      amount: '', 
      description: '' 
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Add Transaction</h2>
      <div className={styles.formGroup}>
        <label>Amount (₹)</label>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          required
          min="0"
          step="0.01"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
          maxLength="100"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        Add Transaction
      </button>
    </form>
  );
}