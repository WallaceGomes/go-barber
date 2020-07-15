import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import signBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh; /* O elemento assume 100% do tamanho disponível da tela (viewport height) */
  display: flex;

  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content:center;

  animation: ${appearFromLeft} 1s ;

  form{
    margin: 80px 0;
    width:340px;

    text-align: center;
    h1{
      margin-bottom: 24px;
    }

    a{
      color: #F4EFE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;

      &:hover{
        color: ${shade(0.2, '#F4EFE8')};
      }
    }
  }

  > a { /* Aplica os estilos somente para o a que estiver diretamente dentro do elemento e não interfere nos filhos */
    color: #ff9000;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: color 0.2s;

    svg{
      margin-right: 16px;
    }

    &:hover{
      color: ${shade(0.2, '#FF9000')};
    }
  }

`;

export const Background = styled.div`
  flex: 1; /* preenche todo o conteúdo disponível do elmento em que está */
  background: url(${signBackgroundImg}) no-repeat center;
  background-size: cover; /* dimensiona a imagem ao máximo possível do elemento */
`;
