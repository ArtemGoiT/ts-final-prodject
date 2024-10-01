import { Navigate } from "react-router-dom";
interface RestrictedRouteProps {
    component: React.FC;
    redirectTo?: string;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ component: Component, redirectTo = "/"}) => {
  
    return <Navigate to={redirectTo}/> 

  
};

export default RestrictedRoute;