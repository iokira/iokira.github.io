import Link from "@/components/parts/link"
import style from "./index.module.scss"
import { useState } from "react"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(true)
    return (
        <header className={style.header}>
            <Link href="/">iokira.github.io</Link>
            {menuOpen && (
                <div className={style.menu}>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                </div>
            )}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={style.menuButton}
            >
                🍔
            </button>
        </header>
    )
}

export default Header
