import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import Header from "../components/header"
import Footer from "../components/footer"

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </ChakraProvider>
    )
}

export default App
