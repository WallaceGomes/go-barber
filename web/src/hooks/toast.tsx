import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  //atenção na tipagem, como é um array de ToastMessages tem que colocar [] na tipagem tbm
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  //helper Omit, ajuda para tipagem recebe o tipo e o parâmetro que será omitido nele
  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    };

    //respeitando a imutabilidade do estado
    //pega o state anterior e adiciona o toast novo
    setMessages((state) => [...state, toast]);
  }, []);
  const removeToast = useCallback((id: string) => {
    //filtra as mensagens e deixa a penas as diferentes do id pra ser removido
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }} >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { useToast, ToastProvider }
