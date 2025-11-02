import { useState, type ChangeEvent } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { z } from "zod";
import { CircularProgress } from "@mui/material";
import { LoadingComponent } from "../../loading-component";

const schema = z.object({
  userName: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 6 characters" }),
  age: z.number().int().gte(18, { message: "Must be 18 or older" }),
  phone: z.string().min(5, { message: "Invalid phone number" }),
});

type RegisterForm = z.infer<typeof schema>;
export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    age: "",
    phone: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState("");
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { userName } = schema.shape;
    const result = userName.safeParse(value);
    // if (!result.success) {
    //     const fieldErrors = result.error.format();
    //     setErrors({ ...errors, ...fieldErrors });
    //     setMessage("");
    // } else {
    //     setErrors({});
    // }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log("Register render..");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const result = schema.safeParse({
      ...formData,
      age: Number(formData.age),
    });
    if (!result.success) {
      const fieldErrors = result.error.format();
      setErrors(fieldErrors);
      setMessage("");
      return;
    }
    setErrors({});
    try {
      setIsLoadingRegister(true);
      const r = await axios.post("http://localhost:3000/auth/register", {
        ...formData,
        age: Number(formData.age),
      }); // change age to number
      // redirect to login
      setMessage("Successfully registered!");
    } catch (err) {
      setMessage("Failed to register.");
    } finally {
      setIsLoadingRegister(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email</label>
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className={styles.input}
        />
        {errors?._errors?.[0] && (
          <p className={styles.error}>{errors?._errors?.[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Password</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
        {errors?.password?._errors[0] && (
          <p className={styles.error}>{errors?.password?._errors[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Age</label>
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className={styles.input}
        />
        {errors?.age?._errors[0] && (
          <p className={styles.error}>{errors?.age?._errors[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Phone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.input}
        />
        {errors?.phone?._errors[0] && (
          <p className={styles.error}>{errors?.phone?._errors[0]}</p>
        )}
      </div>
      <LoadingComponent isLoading={isLoadingRegister}>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </LoadingComponent>
      {message && <p>{message}</p>}
    </form>
  );
}
