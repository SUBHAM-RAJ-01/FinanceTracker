import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p>Loading your financial data...</p>
    </div>
  );
};

export default Loading;