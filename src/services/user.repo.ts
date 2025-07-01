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

  public async getUsers() {
    const json = await AsyncStorage.getItem(UserRepository.KEY);
    if (json) return JSON.parse(json) as User[];
    return [];
  }

  public async login(email: string, senha: string) {
    try {
      const json = await AsyncStorage.getItem(UserRepository.KEY);
      const users: User[] = JSON.parse(json!);

      let user: User = {} as User;

      for (const u of users) {
        if (u.email === email && u.password === senha) {
          user = u;
        }
      }

      return user ? user : null;
    } catch (e) {
      console.log(e);
    }
  }

  public async save(user: User) {
    const list = await this.getUsers();

    const finded = list.find(p => this.equals(p, user));
    if (finded) {
      finded.name = user.name;
      finded.email = user.email;
    } else {
      list.push(user);
    }

    this.persist(list);
  }

  // REMOVER??
  // public async remove(user: User) {
  //   let list = await this.getUsers();
  //   list = list.filter(u => !this.equals(u, user));

  //   this.persist(list);
  // }
}

export const userRepository = new UserRepository();
