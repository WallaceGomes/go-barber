import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  BackToSignInButton,
  BackToSignInText,
} from './styles';

/* NOTA

  No IOS o teclado entra na frente da tela quando vai digitar então tem que usar o
  keyboardAvoidingView para isso não acontecer
  No Android esse comportamente já o padrão xD

  Os Textos no RN não possuem animação, pode-se usar uma tag View em branco
  para fazer a animação nela e consequentemente no texto...

  ScrollView é usado para abilitar o scroll na tela
  keyboardShouldPersistTaps > Comportamento do teclado quando tocar na parte de fora dele,
  handled > baseado no SO
*/

const SignUp: React.FC = () => {
  //add keyboard listenner to hide and show create account button
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg}></Image>
            <View>
              <Title>Cadastro</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button
              onPress={() => {
                console.log('ok');
              }}
            >
              Entrar
            </Button>
          </Container>
          <BackToSignInButton>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para login</BackToSignInText>
          </BackToSignInButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
