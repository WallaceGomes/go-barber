import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`

  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #666360;
  display:flex;
  align-items: center;

  & + div{ /* Aplica-se a todo input que é precedido de outro input*/
      margin-top: 8px;
    }

    /*define a cor do ícone e da borda quando focado */
  ${(props) => props.isFocused &&
    css`
  color: #ff9000;
  border-color: #ff9000;
  `}
  /* define a cor somente do ícone quando estiver preenchido */
  ${(props) => props.isFilled &&
    css`
  color: #ff9000;
  `}

  input{
    flex: 1;
    background: transparent;
    border: 0;
    color: #F4EFE8;

    &::placeholder{
      color: #666360;
    }
  }

  svg{
    margin-right: 16px;
  }

`;
