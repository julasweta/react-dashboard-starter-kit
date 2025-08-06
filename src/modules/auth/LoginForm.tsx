import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Button } from "../../components/ui/Buttons/Button";
import { Input } from "../../components/ui/Inputs/Input";
import classNames from "classnames";
import styles from "./LoginForm.module.scss";
import { authService } from "../../services/AuthService";

interface IAuth {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { user } = useAuthStore();
  const [form, setForm] = useState<IAuth>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await authService.login(form);
      navigate("/dashboard"); // Перенаправлення після успішного логіну
    } catch (error) {
      setError((error as Error).message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classNames(styles.loginContainer)}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
        <p className={styles.infoText}>
          This is a test authentication. Enter any data to log in.
          <br />
          Це тестова авторизація. Для входу введіть будь-які дані.
        </p>
      </form>
    </div>
  );
};
