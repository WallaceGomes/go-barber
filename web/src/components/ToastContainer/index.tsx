import React from 'react';

import { Container, Toast } from './styles';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription >
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login</p>
        </div>

        <button type="button" >
          <FiXCircle size={20} />
        </button>
      </Toast >
      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
        </div>

        <button type="button" >
          <FiXCircle size={20} />
        </button>
      </Toast>
      <Toast type="error" hasDescription>
        <FiAlertCircle size={20} />

        <div>
          <strong>Aconteceu um erro</strong>
          <p>Não foi possível fazer login</p>
        </div>

        <button type="button" >
          <FiXCircle size={20} />
        </button>
      </Toast>
    </Container>
  );
}

export default ToastContainer;
