import "@globals"
import style from "@/styles/_app.module.scss"
import type { AppProps } from "next/app"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "sanitize.css"

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <main className={style.main}>
            <Header />
            <div className={style.component}>
                <Component {...pageProps} />
            </div>
            <Footer />
        </main>
    )
}

export default App
