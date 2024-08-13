import Post from "@/components/parts/post"
import styles from "./style.module.scss"

const Posts = ({ posts }: { posts: Post[] }) => {
    return (
        <div className={styles.posts}>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    )
}

export default Posts
