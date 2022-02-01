import { Navigate } from 'react-router-dom';


export const PrivateRoute = ({ isAuthenticated, children }) => {

    return isAuthenticated
        ? children                      //lo lleva a la pantalla que solicito
        : <Navigate to='/auth/login' /> //lo redirecciona a login
};
