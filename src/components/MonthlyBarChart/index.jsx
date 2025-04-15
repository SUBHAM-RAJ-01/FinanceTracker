import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import styles from './styles.module.css';

export default function MonthlyBarChart() {
  const { transactions } = useContext(FinanceContext);

  const getMonthlyData = () => {
    const monthlyData = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + t.amount;
    });
    return Object.entries(monthlyData).map(([name, value]) => ({ name, value }));
  };

  const data = getMonthlyData();

  return (
    <div className={styles.container}>
      <h2>Monthly Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}