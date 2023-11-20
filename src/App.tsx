import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<div>404... not found </div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
