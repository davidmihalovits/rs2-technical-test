import "../styles/globals.sass";
import "../styles/variables.sass";
import Head from "next/head";
import { useState } from "react";

import Navbar from "../components/Navbar";

const App = ({ Component, pageProps }) => {
    const [token, setToken] = useState("");

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="keywords" content="Technical test for RS2" />
                <meta name="description" content="Technical test for RS2" />
                <link rel="icon" href="/favicon.ico" />
                <title>RS2 Test</title>
            </Head>

            <Navbar token={token} setToken={setToken} />

            <Component {...pageProps} />
        </>
    );
};

export default App;
