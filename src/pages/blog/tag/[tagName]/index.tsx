import Posts from "@/components/parts/posts"
import usePosts from "@/hooks/usePosts"
import { GetStaticPaths, GetStaticProps } from "next"
import { useEffect } from "react"

export const getStaticPaths = (async () => {
    const { getTags } = usePosts()
    const tags: string[] = await getTags()
    const paths = tags.map((tag) => {
        return {
            params: {
                tagName: tag,
            },
        }
    })

    return {
        paths: paths,
        fallback: false,
    }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
    const { getPosts } = usePosts()
    const { params } = context
    const tagName = params.tagName as string
    const posts = await getPosts(tagName)

    return {
        props: {
            posts,
            tagName,
        },
    }
}) satisfies GetStaticProps<{ posts: Post[]; tagName: string }>

const Tag = ({ posts, tagName }: { posts: Post[]; tagName: string }) => {
    return (
        <div>
            <h1>Blog</h1>
            <h2>Tag: {tagName}</h2>
            <Posts posts={posts} />
        </div>
    )
}

export default Tag
