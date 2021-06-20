import styles from "../styles/Navbar.module.sass";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
    const [token, setToken] = useState("");

    const router = useRouter();

    // the navbar changes after the user logs in/out
    useEffect(() => {
        const token = localStorage.getItem("token");

        setToken(token);
    }, [router]);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    // if authenticated
    if (token) {
        return (
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <p className={styles.name}>Hello, {token}!</p>
                    <button className={styles.logout} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // if not authenticated
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href="/" passHref>
                    <h1 className={styles.title}>RS2next</h1>
                </Link>
                <Link href="/login" passHref>
                    <button className={styles.button}>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
