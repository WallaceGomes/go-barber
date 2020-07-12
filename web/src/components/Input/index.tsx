import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

// pega todas as props que um input normal contém
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  //sobrescreve o name para ficar obrigatório
  name: string;
  icon: React.ComponentType<IconBaseProps>;
  //para ter acesso às propriedades de um component é necessário passar como
  //props na tipagem
}

//é nessessário a letra maiúscula para o react entender que é um componente que está sendo passado
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
