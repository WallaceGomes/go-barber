import styled from "styled-components";
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

  form{
    margin: 80px 0;
    width:340px;

    text-align: center;
    h1{
      margin-bottom: 24px;
    }

    input{
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #F4EFE8;

      &::placeholder{
        color: #666360;
      }

      & + input{ /* Aplica-se a todo input que é precedido de outro input*/
        margin-top: 8px;
      }
    }

    button{
      background: #FF9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      width: 100%;
      color: #312e38;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover{
        background: ${shade(0.2, '#FF9000')};
      }
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
