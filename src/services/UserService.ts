import type { IUser, IUsersResponse } from "../interfaces/IUser";
import { apiService, type IRes } from "./ApiServices";
import { useUserStore } from "../store/useUserStore";

const userService = {
  // Отримати всіх користувачів
  async getAll(): Promise<IUser[]> {
    console.log("Отримання користувачів...");
    try {
      const { data } = await apiService.get<IUsersResponse>("users?limit=10&skip=0");
      console.log("Отримані користувачі:", data);
      useUserStore.getState().setUsers(data.users);
      return data.users;
    } catch (error) {
      throw new Error("Не вдалося отримати список користувачів: " + (error as Error).message);
    }
  },

  // Отримати одного користувача по ID
  async getById(id: number): Promise<IUser> {
    try {
      const { data } = await apiService.get<IUser>(`users/${id}`);
      return data;
    } catch (error) {
      throw new Error("Не вдалося отримати користувача: " + (error as Error).message);
    }
  },

  // Оновити користувача
  async updateUser(id: number, userData: Partial<IUser>): Promise<IUser> {
    try {
      const { data } = await apiService.patch<IUser>(`users/${id}`, userData);
      useUserStore.getState().updateUserInStore(data);
      return data;
    } catch (error) {
      throw new Error("Не вдалося оновити користувача: " + (error as Error).message);
    }
  },

  // Видалити користувача
  async deleteUser(id: number): Promise<void> {
    try {
      await apiService.delete(`users/${id}`);
      useUserStore.getState().removeUser(id);
    } catch (error) {
      throw new Error("Не вдалося видалити користувача: " + (error as Error).message);
    }
  },
};

export { userService };
