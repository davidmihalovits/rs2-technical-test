import styles from "../styles/Index.module.sass";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            router.push("/dashboard");
        }
    }, [router]);

    return (
        <div className={styles.container}>
            <div className={styles.index}>
                <h1 className={styles.title}>Welcome!</h1>
                <p className={styles.intro}>
                    This is the technical test for RS2. Please log in to get
                    started.
                </p>
            </div>
        </div>
    );
};

export default Index;
