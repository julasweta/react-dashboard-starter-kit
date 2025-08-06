import { useState } from "react";
import { Button } from "../../components/ui/Buttons/Button";
import { Input } from "../../components/ui/Inputs/Input";
import classNames from "classnames";
import styles from "./LoginForm.module.scss";

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
    <div className={classNames(styles.loginContainer)}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={submitHandler} className={styles.form}>
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
        <Button type="submit">Sign In</Button>
      </form>
      <p className={styles.infoText}>
        This is a test authentication. Enter any data to log in.
        <br />
        Це тестова авторизація. Для входу введіть будь-які дані.
      </p>
    </div>
  );
};

