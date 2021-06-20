import styles from "../styles/Login.module.sass";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.push("/dashboard");
        }
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const delay = (ms) => new Promise((res) => setTimeout(res, ms));

        await delay(2000);

        setLoading(false);

        localStorage.setItem("token", name);

        router.push("/dashboard");
    };

    const disabled = !name || !password;

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <form className={styles.form} onSubmit={submit} noValidate>
                    <label className={styles.label} htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                    />
                    <label className={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={disabled || loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
