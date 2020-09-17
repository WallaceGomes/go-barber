import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  //enquanto o aplicativo carrega pode mostrar uma splashscreen por exemplo
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  //Caso o usuário esteja logado(existe) mostra as rotas do App
  //no contrário somente as rotas de auth
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
