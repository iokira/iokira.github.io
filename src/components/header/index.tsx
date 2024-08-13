import Link from "@/components/parts/link"
import styles from "./style.module.scss"
import { useState } from "react"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(true)
    return (
        <header className={styles.header}>
            <Link href="/">iokira.github.io</Link>
            {menuOpen && (
                <div className={styles.menu}>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                </div>
            )}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={styles.menuButton}
            >
                🍔
            </button>
        </header>
    )
}

export default Header
