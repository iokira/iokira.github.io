import Link from "@/components/parts/link"
import style from "./index.module.scss"
import Tags from "../tags"

const Post = ({ post }: { post: Post }) => {
    const date =
        post.postData.updateDate != post.postData.createDate
            ? post.postData.updateDate + " (edited)"
            : post.postData.createDate.toString()
    return (
        <article className={style.post}>
            <p className={style.date}>{date}</p>
            <div className={style.title}>
                <Link href={"/blog/posts/" + post.id}>{post.postData.title}</Link>
            </div>
            <p className={style.description}>{post.postData.description}</p>
            <Tags tags={post.postData.tags} />
        </article>
    )
}

export default Post
