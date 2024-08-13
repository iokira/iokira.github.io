import Link from "@/components/parts/link"
import styles from "./style.module.scss"

const Post = ({ post }: { post: Post }) => {
    return (
        <article className={styles.post}>
            <p>{post.data.updateDate}</p>
            <Link href={"blog/posts/" + post.id}>{post.data.title}</Link>
            <p>{post.data.description}</p>
        </article>
    )
}

export default Post
