import Posts from "@/components/parts/posts"
import usePosts from "@/hooks/usePosts"
import { GetStaticProps, InferGetStaticPropsType } from "next"

export const getStaticProps = (async () => {
    const { getPosts } = usePosts()
    const posts: Post[] = await getPosts()

    return {
        props: {
            posts,
        },
    }
}) satisfies GetStaticProps<{ posts: Post[] }>

const Blog = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <h1>Blog</h1>
            <Posts posts={posts} />
        </div>
    )
}

export default Blog
