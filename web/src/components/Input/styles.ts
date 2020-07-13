import styled, { css } from 'styled-components';
import Tooltip from './../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
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

  /* define uma borda vermelha quando estiver com erro no formulário */
  ${(props) => props.isErrored &&
    css`
      border-color: #c53030;
  `}

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

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
    svg{
    margin: 0;
  }

  span{
    background: #c53030;
    color: #fff;

    &::before{
      border-color: #c53030 transparent ;
    }
  }
`;
