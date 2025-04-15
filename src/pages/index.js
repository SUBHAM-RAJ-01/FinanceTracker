import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import Loading from '../components/Loading';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import DashboardCard from '../components/DashboardCard';
import BudgetComparison from '../components/BudgetComparison';
import CategoryPieChart from '../components/CategoryPieChart';
import ConfirmationDialog from '../components/ConfirmationDialog';
import styles from '../styles/Home.module.css';

export default function Home() {
  const finance = useContext(FinanceContext);

  if (!finance) {
    return <div className={styles.error}>Financial context not available</div>;
  }

  const { 
    isLoading, 
    error, 
    transactions = [], 
    clearAllTransactions 
  } = finance;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personal Finance Dashboard</h1>
      
      <div className={styles.grid}>
        <div className={styles.column}>
          <DashboardCard />
          <TransactionForm />
        </div>
        
        <div className={styles.column}>
          <BudgetComparison />
          <CategoryPieChart />
        </div>
      </div>
      
      <TransactionList />
      
      {transactions.length > 0 && (
        <ConfirmationDialog
          title="Clear All Transactions"
          message="Are you sure you want to delete all transactions? This action cannot be undone."
          onConfirm={clearAllTransactions}
          triggerText="Clear All Transactions"
          confirmText="Delete All"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}
