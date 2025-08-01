
export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  state: "active" | "inactive";
}