import React from 'react';
import { Container } from './styles';

//para receber estilos de um elemento superior tem que permitir no tipo que o elemento
//receba o className pois é assim que o styledcomponents funciona
interface ToolTipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ToolTipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
}

export default Tooltip;
