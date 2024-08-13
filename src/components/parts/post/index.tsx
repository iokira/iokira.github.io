import Link from "@/components/parts/link"
import styles from "./style.module.scss"

const Post = ({ post }: { post: Post }) => {
    const date =
        post.postData.updateDate != post.postData.createDate
            ? post.postData.updateDate + " (edited)"
            : post.postData.createDate.toString()
    return (
        <article className={styles.post}>
            <p className={styles.date}>{date}</p>
            <div className={styles.title}>
                <Link href={"blog/posts/" + post.id}>{post.postData.title}</Link>
            </div>
            <p className={styles.description}>{post.postData.description}</p>
        </article>
    )
}

export default Post
