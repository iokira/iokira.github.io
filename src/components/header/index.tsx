import Link from "@/components/link"
import style from "./index.module.scss"
import { useState } from "react"

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    return (
        <header className={style["header"]}>
            <Link href="/">iokira.github.io</Link>
            {menuOpen && (
                <div className={style["menu"]}>
                    <Link href="/about">About</Link>
                    <Link href="/blog">Blog</Link>
                </div>
            )}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={style["menu-button"]}
            >
                🍔
            </button>
        </header>
    )
}

export default Header
