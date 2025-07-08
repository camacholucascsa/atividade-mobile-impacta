import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { userRepository } from '../services/user.repo';
import { User } from '../models/user';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type StackParams = {
  Edit: { user: User };
};

export default function ListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

  useFocusEffect(
  useCallback(() => {
    const loadUsers = async () => {
      const data = await userRepository.getUsers();
      setUsers(data);
    };

    loadUsers();
  }, [])
);

  const handleEdit = (user: User) => {
    navigation.navigate('Edit', { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.email}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)}>
            <Feather name="edit" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum usuário encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
});
