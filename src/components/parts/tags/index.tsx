import Tag from "@/components/parts/tag"
import styles from "./style.module.scss"

const Tags = ({ tags }: { tags: string[] }) => {
    return (
        <div className={styles.tags}>
            {tags.map((tag) => (
                <Tag
                    key={tag}
                    name={tag}
                />
            ))}
        </div>
    )
}

export default Tags
