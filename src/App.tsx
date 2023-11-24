import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import LoginPage from './pages/login/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import todoStore from './store/todoStore';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage todoStore={todoStore} />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute todoStore={todoStore} />}
        >
          <Route path="" element={<DashboardPage todoStore={todoStore} />} />
        </Route>
        <Route path="*" element={<div>404... not found </div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
