import Post from "@/components/post"
import style from "./index.module.scss"
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
                    return a.postData.updateDate < b.postData.updateDate ? -1 : 1
                } else {
                    return a.postData.updateDate > b.postData.updateDate ? -1 : 1
                }
            }),
        )
    }, [order, posts])

    return (
        <div className={style["posts"]}>
            <select
                className={style["select"]}
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
            {sortedPosts.length === 0 && <p>No posts found</p>}
        </div>
    )
}

export default Posts
