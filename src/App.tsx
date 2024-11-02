import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import NeracaPage from './components/pages/NeracaPage';
import LaporanAktivitasPage from './components/pages/LaporanAktivitasPage';
import LaporanArusKasPage from './components/pages/LaporanArusKasPage';
import DaftarAkunPage from './components/pages/DaftarAkunPage';
import ProgramPage from './components/pages/ProgramPage';
import BudgetRealizationPage from './components/pages/BudgetRealizationPage';
import BudgetProgramDetailPage from './components/pages/BudgetProgramDetailPage';
import TransactionForm from './components/forms/TransactionForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/laporan/neraca' element={<NeracaPage />} />
          <Route path='/laporan/aktivitas' element={<LaporanAktivitasPage />} />
          <Route path='/laporan/arus-kas' element={<LaporanArusKasPage />} />
          <Route path='/master/akun' element={<DaftarAkunPage />} />
          <Route path='/master/program' element={<ProgramPage />} />
          <Route
            path='/laporan/budget-realisasi'
            element={<BudgetRealizationPage />}
          />
          <Route
            path='/laporan/budget-realisasi/:id'
            element={<BudgetProgramDetailPage />}
          />
          <Route path='/input/transaksi' element={<TransactionForm />} />
          <Route
            path='/input/pemasukan'
            element={<TransactionForm type='pemasukan' />}
          />
          <Route
            path='/input/pengeluaran'
            element={<TransactionForm type='pengeluaran' />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
