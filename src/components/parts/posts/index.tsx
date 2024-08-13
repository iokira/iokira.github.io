import Post from "@/components/parts/post"
import styles from "./style.module.scss"
import { useEffect, useState } from "react"

enum Order {
    Asc,
    Desc,
}

const Posts = ({ posts }: { posts: Post[] }) => {
    const [order, setOrder] = useState<Order>(Order.Desc)
    const [sortedPosts, setSortedPosts] = useState<Post[]>(posts)

    useEffect(() => {
        setSortedPosts(
            posts.slice().sort((a, b) => {
                if (order === Order.Asc) {
                    return a.postData.createDate < b.postData.createDate ? -1 : 1
                } else {
                    return a.postData.createDate > b.postData.createDate ? -1 : 1
                }
            }),
        )
    }, [order])

    return (
        <div className={styles.posts}>
            <select
                className={styles.select}
                name="order"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
            >
                <option value={Order.Asc}>Asc</option>
                <option value={Order.Desc}>Desc</option>
            </select>
            {sortedPosts.map((post) => (
                <Post
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    )
}

export default Posts
