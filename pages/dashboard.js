import styles from "../styles/Dashboard.module.sass";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import products from "../db/products.json";

const Dashboard = () => {
    const [basket, setBasket] = useState([]);
    const [search, setSearch] = useState("");
    const [dropDown, setDropDown] = useState(false);
    const [selected, setSelected] = useState("All");

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
    }, []);

    const onChange = (param) => {
        let product = products.find((pr) => pr.ID === param.p.ID);

        if (basket.includes(product)) {
            return;
        }

        product.qty = param.e.target.value;
    };

    const addToBasket = (p) => {
        let product = products.find((pr) => pr.ID === p.ID);

        if (!product.qty || product.qty === "0" || product.qty < 0) {
            return alert("You must enter a valid quantity!");
        }

        if (basket.includes(product)) {
            return alert(`You already added ${p.Name} to your basket!`);
        }

        setBasket([...basket, product]);
    };

    const handleSearch = (e) => {
        if (e.target.value.match("^[a-zA-Z ]*$") !== null) {
            setSearch(e.target.value);
        }
    };

    const filteredProducts = products
        .filter((name) =>
            name.Name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((type) => {
            if (selected === type.Type) {
                return type.Type;
            } else {
                return selected === "All";
            }
        });

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.basket}>
                    <p className={styles.subtitle}>Basket:</p>
                    <div className={styles.box}>
                        {basket.length === 0 ? (
                            <p className={styles.empty}>Empty basket.</p>
                        ) : (
                            basket.map((b) => (
                                <div className={styles.grid} key={b.ID}>
                                    <p className={styles.name}>{b.Name}</p>
                                    <p className={styles.qty}>{b.qty}x</p>
                                </div>
                            ))
                        )}
                        {basket.length > 0 && (
                            <button
                                className={styles.buy}
                                onClick={() => {
                                    alert("Products successfully purchased!");
                                    setBasket([]);
                                    setDropDown(false);
                                    setSelected("All");
                                    setSearch("");
                                }}
                            >
                                Buy Products
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e)}
                        className={styles.input}
                        placeholder="Search..."
                        maxLength="30"
                    />
                    <p className={styles.count}>{search.length} / 30</p>
                    <div
                        className={styles.dropdown}
                        onClick={() => setDropDown(!dropDown)}
                    >
                        {selected}
                        {dropDown && (
                            <div className={styles.open}>
                                <p
                                    onClick={() => {
                                        setSelected("All");
                                        setDropDown(false);
                                    }}
                                >
                                    All
                                </p>
                                <p
                                    onClick={() => {
                                        setSelected("Books");
                                        setDropDown(false);
                                    }}
                                >
                                    Books
                                </p>
                                <p
                                    onClick={() => {
                                        setSelected("Music");
                                        setDropDown(false);
                                    }}
                                >
                                    Music
                                </p>
                                <p
                                    onClick={() => {
                                        setSelected("Games");
                                        setDropDown(false);
                                    }}
                                >
                                    Games
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.products}>
                    {filteredProducts.length > 0 &&
                        filteredProducts.map((p) => (
                            <div className={styles.product} key={p.ID}>
                                <h2 className={styles.title}>{p.Name}</h2>
                                <div className={styles.box}>
                                    <p className={styles.type}>{p.Type}</p>
                                    <input
                                        placeholder="Qty."
                                        id={p.ID}
                                        name="quantity"
                                        type="number"
                                        onChange={(e) => onChange({ e, p })}
                                        className={styles.input}
                                    />
                                </div>
                                <p className={styles.description}>
                                    {p.Description}
                                </p>
                                <button
                                    className={styles.button}
                                    onClick={() => addToBasket(p)}
                                >
                                    Add To Basket
                                </button>
                            </div>
                        ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className={styles.notfound}>No product found.</div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
