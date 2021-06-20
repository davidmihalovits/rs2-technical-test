import styles from "../styles/Navbar.module.sass";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = (props) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        props.setToken(token);
    }, [props]);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    if (props.token) {
        return (
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <p className={styles.name}>Hello, {props.token}!</p>
                    <button className={styles.logout} onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

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
