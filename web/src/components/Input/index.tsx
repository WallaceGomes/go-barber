import React, { InputHTMLAttributes, useRef, useEffect, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

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
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  //fieldname = nome do input
  //defaultValue = valor inicial
  //error = se o campo está com erro ou não
  //registerField = faz o registro(bind) do input no hook
  const { fieldName, defaultValue, error, registerField } = useField(name);

  //inputRef = pega a referencia do elemento de input
  //path = onde está o valor armazenado no elemento

  //useCallback = impedir que uma função seja recriada dentro do ciclo de vida
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    //checa se existe algum valor em no inputRef pois inicialmente ele é null
    //tendo algum valor procede para o if
    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }

    //setIsFilled(!!inputRef.current?.value);
    //também pode set feito desta forma, transformando em booleano
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error}
    </Container>
  );
};

export default Input;
