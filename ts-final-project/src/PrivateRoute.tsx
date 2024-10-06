import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from './redux/user/selectors';


interface PrivateRouteProps {
  component: React.ComponentType; // Тип для React-компонента
  redirectTo?: string; // Опциональный пропс для перенаправления
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  redirectTo = '/login',
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  // Если пользователь не залогинен, перенаправляем на указанный маршрут
  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
