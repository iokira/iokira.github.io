import Link from "@/components/parts/link"
import styles from "./style.module.scss"

const Post = ({ post }: { post: Post }) => {
    const date = post.data.updateDate ? post.data.updateDate + " (edited)" : post.data.createDate
    return (
        <article className={styles.post}>
            <p className={styles.date}>{date}</p>
            <div className={styles.title}>
                <Link href={"blog/posts/" + post.id}>{post.data.title}</Link>
            </div>
            <p className={styles.description}>{post.data.description}</p>
        </article>
    )
}

export default Post
