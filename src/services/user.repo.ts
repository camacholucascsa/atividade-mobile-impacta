import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/user';

class UserRepository {
  private static readonly KEY = 'APP_PLACE@user_documents';

  private async persist(list: User[]) {
    await AsyncStorage.setItem(UserRepository.KEY, JSON.stringify(list));
  }

  private equals(u1: User, u2: User): boolean {
    return u1.email === u2.email;
  }

  public async getUsers(): Promise<User[]> {
    const json = await AsyncStorage.getItem(UserRepository.KEY);
    return json ? JSON.parse(json) as User[] : [];
  }

  public async login(email: string, senha: string): Promise<User | null> {
    try {
      const json = await AsyncStorage.getItem(UserRepository.KEY);
      if (!json) return null;

      const users: User[] = JSON.parse(json);
      const user = users.find(u => u.email === email && u.password === senha);

      return user ?? null;
    } catch (e) {
      console.error('Erro ao logar:', e);
      return null;
    }
  }

  public async save(user: User): Promise<void> {
    const list = await this.getUsers();

    const index = list.findIndex(p => this.equals(p, user));
    if (index !== -1) {
      list[index] = user;
    } else {
      list.push(user);
    }

    await this.persist(list); 
  }

public async updateUser(updated: User) {
  const users = await this.getUsers();

  const newList = users.map(user => {
    if (user.email === updated.email) {
      return { ...user, ...updated }; // sobrescreve os dados
    }
    return user;
  });

  await this.persist(newList);
}

  public async setCurrentUser(user: User): Promise<void> {
    await AsyncStorage.setItem('CURRENT_USER', JSON.stringify(user));
  }

  public async getCurrentUser(): Promise<User | null> {
    const json = await AsyncStorage.getItem('CURRENT_USER');
    return json ? JSON.parse(json) as User : null;
  }

}

export const userRepository = new UserRepository();