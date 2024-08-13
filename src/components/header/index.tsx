import Link from "@/components/parts/link"
import styles from "./style.module.scss"

const Header = () => {
    return (
        <header className={styles.header}>
            <Link href="/">iokira.github.io</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
        </header>
    )
}

export default Header
