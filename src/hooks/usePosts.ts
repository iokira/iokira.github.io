import { readFileSync, readdirSync } from "fs"
import matter from "gray-matter"
import path from "path"

const usePosts = () => {
    const postDir = path.join(process.cwd(), "src/posts")

    const getPost = async (id: string) => {
        const fileName = id + ".mdx"
        const fullPath = path.join(postDir, fileName)
        const fileContents = readFileSync(fullPath, "utf-8")

        const { data, content } = matter(fileContents)

        const postData: PostData = {
            title: data.title as string,
            description: data.description as string,
            tags: data.tags as string[],
            createDate: data.createDate as Date,
            updateDate: data.updateDate as Date,
            draft: data.draft as boolean,
        }

        return {
            id,
            postData,
            content,
        }
    }

    const getPosts = async (tag?: string) => {
        const fileNames = readdirSync(postDir)
        const postsData = fileNames.map((fileName) => getPost(fileName.replace(/\.mdx/, "")))

        const contents = (await Promise.all(postsData)).filter((post) => !post.postData.draft)

        if (tag) {
            return contents.filter((post) => post.postData.tags.includes(tag))
        }

        return contents
    }

    const getTags = async () => {
        const posts = await getPosts()
        const tags = posts.flatMap((post) => post.postData.tags)
        return Array.from(new Set(tags))
    }

    return {
        getPost,
        getPosts,
        getTags,
    }
}

export default usePosts
