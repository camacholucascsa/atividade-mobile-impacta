import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { userRepository } from '../services/user.repo';
import { User } from '../models/user';

type RouteParams = {
  Edit: { user: User };
};

export default function EditUserPage() {
  const route = useRoute<RouteProp<RouteParams, 'Edit'>>();
  const navigation = useNavigation();
  const [user, setUser] = useState<User>(route.params.user);

  const handleSave = async () => {
    if (!user.name || !user.email || !user.password) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    await userRepository.updateUser(user);
    Alert.alert('Sucesso', 'Usuário atualizado!');
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={user.password}
        secureTextEntry
        onChangeText={(text) => setUser({ ...user, password: text })}
      />

      <Button title="Salvar Alterações" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 12,
    borderRadius: 6,
  },
});