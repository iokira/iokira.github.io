import "@globals"
import styles from "@/styles/_app.module.scss"
import type { AppProps } from "next/app"
import Header from "@/components/header"
import Footer from "@/components/footer"

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <main className={styles.main}>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </main>
    )
}

export default App
