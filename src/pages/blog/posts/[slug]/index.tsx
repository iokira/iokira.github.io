import Tags from "@/components/parts/tags"
import usePosts from "@/hooks/usePosts"
import { MDXProvider } from "@mdx-js/react"
import { GetStaticPaths, GetStaticProps } from "next"

export const getStaticPaths = (async () => {
    const { getPosts } = usePosts()
    const posts: Post[] = await getPosts()
    const paths = posts.map((post) => {
        return {
            params: {
                slug: post.id,
            },
        }
    })

    return {
        paths: paths,
        fallback: false,
    }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
    const { getPost } = usePosts()
    const { params } = context
    const post = await getPost(params.slug as string)

    return {
        props: {
            post,
        },
    }
}) satisfies GetStaticProps<{ post: Post }>

const Slug = ({ post }: { post: Post }) => {
    return (
        <MDXProvider>
            <h1>{post.postData.title}</h1>
            <p>投稿日: {post.postData.createDate.toString()}</p>
            {post.postData.updateDate != post.postData.createDate && (
                <p>更新日: {post.postData.updateDate.toString()}</p>
            )}
            <Tags tags={post.postData.tags} />
            {post.content}
        </MDXProvider>
    )
}

export default Slug
