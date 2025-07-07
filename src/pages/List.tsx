import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { userRepository } from '../services/user.repo';
import type { User } from '../models/user';

export default function ListPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
    const data = await userRepository.getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => item.email + index}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum usuário encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});