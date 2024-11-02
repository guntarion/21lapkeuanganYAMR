import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import TransactionForm from './components/forms/TransactionForm';
import ProgramPage from './components/pages/ProgramPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/input/transaksi' element={<TransactionForm />} />
          <Route path='/master/program' element={<ProgramPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
