import axios from "axios";
import Swal from "sweetalert2";
import css from "./index.module.css";
import Header from "../../ui/header";
import { Button, CircularProgress, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const Registration = z.object({
  password: z.string().min(3),
  userName: z.string().email(),
  phone: z.string().min(10),
});

// Registration.parse({ username: "Ludwig" });

const REGISTER_URL = "http://localhost:2200/api/auth/register";

export default function RegistrationPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log("render?");
  async function registerAction() {
    try {
      setIsLoading(true);
      await axios.post(REGISTER_URL, {
        userName: userName,
        password: password,
      });
      Swal.fire({
        title: "Success!",
        icon: "success",
      }).then(() => {
        navigate("/auth/login");
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleUserName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  }, []);

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  function handlePhone(event: ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value);
  }

  return (
    <div className={css.container}>
      <div className={css.registerContainer}>
        <div className={css.headerCenter}>
          <Header title={"Registration"} color={"Blue"} />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="phone"
            variant="outlined"
            onChange={handlePhone}
            value={phone}
          />
        </div>
        <div>
          <TextField
            onChange={handleUserName}
            id="outlined-basic"
            label="username"
            variant="outlined"
            value={userName}
          />
        </div>
        <div>
          <TextField
            onChange={handlePassword}
            id="outlined-basic"
            label="password"
            variant="outlined"
            value={password}
          />
        </div>
        <div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <Button
                onClick={() => {
                  const result = Registration.safeParse({
                    userName,
                    password,
                    phone,
                  });
                  if (!result.success) {
                    Swal.fire({
                      title: `${result.error?.errors[0].message}`,
                      icon: "error",
                    });
                  }
                  // console.log(result.error?.errors[0].message);
                  if (result.success) registerAction();
                }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
