import { useState, type ChangeEvent } from "react";
import axios from "axios";
import styles from "./style.module.css";

// const schema = z.object({
//     userName: z.string().email({ message: "Invalid email" }),
//     password: z.string().min(6, { message: "Password must be at least 6 characters" }),
//     age: z.number().int().gte(18, { message: "Must be 18 or older" }),
//     phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: "Invalid phone number" }),
// });

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        age: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [isLoadingRegister, setIsLoadingRegister] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // // Parse with Zod
        // const result = schema.safeParse({
        //     ...formData,
        //     age: Number(formData.age),
        // });

        // if (!result.success) {
        //     const fieldErrors = result.error.flatten().fieldErrors;
        //     setErrors(fieldErrors);
        //     setMessage("");
        //     return;
        // }

        // setErrors({});
        try {
            setIsLoadingRegister(true)
            const response = await axios.post("http://localhost:3000/auth/register", { ...formData, age: Number(formData.age) }); // change age to number
            setMessage("Successfully registered!");
        } catch (err) {
            setMessage("Failed to register.");
        } finally {
            setIsLoadingRegister(false)
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
                {/* {errors.userName && <p className={styles.error}>{errors.userName[0]}</p>} */}
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
                {/* {errors.password && <p className={styles.error}>{errors.password[0]}</p>} */}
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
                {/* {errors.age && <p className={styles.error}>{errors.age[0]}</p>} */}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Phone</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                />
                {/* {errors.phone && <p className={styles.error}>{errors.phone[0]}</p>} */}
            </div>

            {isLoadingRegister ? <span> Loading..</span> : <button type="submit" className={styles.button}>Register</button>}
            {message && <p>{message}</p>}
        </form>
    );
}
