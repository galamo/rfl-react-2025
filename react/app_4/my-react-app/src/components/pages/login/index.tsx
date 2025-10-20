import { useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { z } from "zod"
import { CircularProgress } from "@mui/material";

// const schema = z.object({
//     userName: z.string().email({ message: "Invalid email" }),
//     password: z.string().min(4, { message: "Password must be at least 6 characters" }),
//     age: z.number().int().gte(18, { message: "Must be 18 or older" }),
//     phone: z.string().min(5, { message: "Invalid phone number" }),
// });

export default function LoginPage() {
    
    const userNameInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const counterRef = useRef<Number>(0)
    function handleSubmit(e: any) {
        e.preventDefault();
        console.log(userNameInputRef.current?.value)
    }
   
    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                   
                    ref={userNameInputRef}
                    name="userName"
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                    name="password"
                    type="password"
                    className={styles.input}
                />
            </div>


            {false ? <CircularProgress /> : <button type="submit" className={styles.button}>Register</button>}
        </form>
    );
}
