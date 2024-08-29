import NextLink from "next/link"
import styles from "./style.module.scss"
import { ReactNode } from "react"

type LinkProps = {
    href: string
    children: ReactNode
} & Pick<React.ComponentProps<typeof NextLink>, "target">

const Link: React.FC<LinkProps> = ({ href, children, target }) => {
    return (
        <div className={styles.link}>
            <NextLink
                href={href}
                target={target}
            >
                {children}
            </NextLink>
        </div>
    )
}

export default Link
