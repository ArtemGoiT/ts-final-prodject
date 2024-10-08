import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from './redux/user/selectors';


interface RestrictedRouteProps {
  component: React.ComponentType; // Тип для React-компонента
  redirectTo?: string; // Опциональный пропс для перенаправления
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Если пользователь залогинен, перенаправляем на указанный маршрут
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Component />;
};

export default RestrictedRoute;
