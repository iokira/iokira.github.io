import Link from "@/components/parts/link"
import styles from "./style.module.scss"

const Tag = ({ name }: { name: string }) => {
    return (
        <div className={styles.tag}>
            <Link href={"/blog/tag/" + name}>{name}</Link>
        </div>
    )
}

export default Tag
