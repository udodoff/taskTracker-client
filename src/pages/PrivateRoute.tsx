import { Navigate, Outlet } from 'react-router-dom';
import todoStore from '../store/todoStore';
import { observer } from 'mobx-react-lite';

const PrivateRoute = () => {
  if (todoStore.authorized) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default observer(PrivateRoute);
