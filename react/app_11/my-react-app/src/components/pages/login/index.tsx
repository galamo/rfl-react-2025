import { useRef, useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { Button, CircularProgress } from "@mui/material";
import { loginApi } from "../../../services/login";
import { useNavigate } from "react-router-dom";
import { LoadingComponent } from "../../loading-component";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userNameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userName = userNameInputRef.current?.value?.trim();
    const password = passwordInputRef.current?.value?.trim();

    if (!userName || !password) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginApi({
        userName,
        password,
      });

      console.log("LOGIN SUCCESS:", response.data);
      localStorage.setItem("token", response.token);
      navigate("/countries");
      // Example: store token + redirect
      // localStorage.setItem("token", response.data.token);
      // navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input
          ref={userNameInputRef}
          name="userName"
          className={styles.input}
          onBlur={() => {
            if (
              userNameInputRef.current &&
              userNameInputRef.current.value.length < 5
            )
              setError("Email too short");
            else setError("");
          }}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          ref={passwordInputRef}
          name="password"
          type="password"
          className={styles.input}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <LoadingComponent isLoading={loading}>
        <Button type="submit" className={styles.button}>
          Login
        </Button>
      </LoadingComponent>
    </form>
  );
}
