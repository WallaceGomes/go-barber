import React from 'react';
import { RouteProps as ReactDOMRouteProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // sobrescrevendo o tipo do componente que vem como props
}

// true/true = OK
// true/false = Redirecionar para login
// false/true = Redirecionar para dashboard
// false/false = OK

//location || state from location
//usado para não perder o histórico de redirecionamento durante o redirect das páginas

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
            <Redirect to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }
            }} />
          )
      }}
    />
  );
};

export default Route;


