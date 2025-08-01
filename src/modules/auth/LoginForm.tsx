import { useState } from "react";
import  { Button } from "../../components/ui/buttons/Button";
import  { Input } from "../../components/ui/inputs/Input";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="bg-white p-6 rounded shadow w-80">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" >
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-500 text-center">

        This is a test authentication. Enter any data to log in.
        <br></br>
        Це тестова авторизація. Для входу введіть будь-які дані.
      </p>
    </div>
  );
};

