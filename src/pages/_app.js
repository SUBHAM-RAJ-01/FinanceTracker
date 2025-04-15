// pages/_app.js
import { FinanceProvider } from '../context/FinanceContext'; // Make sure this import matches your export
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <FinanceProvider>
      <Component {...pageProps} />
    </FinanceProvider>
  );
}

export default MyApp;