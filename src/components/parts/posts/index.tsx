import Post from "@/components/parts/post"

const Posts = ({ posts }: { posts: Post[] }) => {
    return posts.map((post) => (
        <Post
            key={post.id}
            post={post}
        />
    ))
}

export default Posts
