import React from 'react';
import { TextInputProps } from 'react-native';

/* NOTA

    Para usar ícones é necessário incluir no build gradle do android essas linhas abaixo

    project.ext.vectoricons = [
    iconFontNames: ['Feather.ttf']
    ];

    apply from : "../../node_modules/react-native-vector-icons/fonts.gradle"

    e então buildar o app novamente
*/

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

//obs//
//keybordAppearance apenas válido para IOS, no Android vai usar o padrão do sistema

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        placeholderTextColor="#666360"
        keyboardAppearance="dark"
        {...rest}
      />
    </Container>
  );
};

export default Input;
