import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { userRepository } from '../services/user.repo';

type LoginStackParamList = {
  Login: undefined;
  List: undefined;
};

export default function LoginPage() {
  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParamList>>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
  const user = await userRepository.login(email, senha);

if (user) {
  navigation.navigate('List'); 

  const handleLogin = async () => {
  const user = await userRepository.login(email, senha);

  if (user) {
    await userRepository.setCurrentUser(user); 
    navigation.navigate('List');
  } else {
    Alert.alert('Erro', 'Email ou senha inválidos.');
  }
};
}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
});
