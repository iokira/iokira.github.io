import Link from "@/components/parts/link"
import styles from "./style.module.scss"

const Post = ({ post }: { post: Post }) => {
    return (
        <article className={styles.post}>
            <p className={styles.date}>{post.data.updateDate}</p>
            <div className={styles.title}>
                <Link href={"blog/posts/" + post.id}>{post.data.title}</Link>
            </div>
            <p className={styles.description}>{post.data.description}</p>
        </article>
    )
}

export default Post
