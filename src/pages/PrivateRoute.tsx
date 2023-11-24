import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Store } from '../store/types';

const PrivateRoute: React.FC<{ todoStore: Store }> = observer(
  ({ todoStore }) => {
    if (todoStore.authorized) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  },
);

export default PrivateRoute;
