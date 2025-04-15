import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import styles from './styles.module.css';

export default function CategoryPieChart() {
  const { transactions = [], categories = [] } = useContext(FinanceContext);

  const getCategoryData = () => {
    const categoryMap = {};
    transactions.forEach(t => {
      if (t.category) {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + (t.amount || 0);
      }
    });
    return categories.map(cat => ({
      name: cat.name,
      value: categoryMap[cat.name] || 0,
      color: cat.color
    })).filter(item => item.value > 0);
  };

  const data = getCategoryData();

  return (
    <div className={styles.container}>
      <h2>Spending by Category</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>No transaction data available</p>
      )}
    </div>
  );
}