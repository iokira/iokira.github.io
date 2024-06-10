import type { AppProps } from "next/app"
import Header from "../components/header"
import Footer from "../components/footer"

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}

export default App
