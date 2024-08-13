import NextLink from "next/link"
import styles from "./style.module.scss"

const Link = ({ href, children }) => {
    return (
        <div className={styles.link}>
            <NextLink href={href}>{children}</NextLink>
        </div>
    )
}

export default Link
