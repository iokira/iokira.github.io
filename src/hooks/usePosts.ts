import { readFileSync, readdirSync } from "fs"
import matter from "gray-matter"
import path from "path"

const postDir = path.join(process.cwd(), "src/pages/blog/posts")

const usePosts = () => {
    const getPosts = async () => {
        const fileNames = readdirSync(postDir)
        const postsData = fileNames.map((fileName) => {
            const id = fileName.replace(/\.mdx/, "")

            const fullPath = path.join(postDir, fileName)
            const fileContents = readFileSync(fullPath, "utf-8")

            const { data, content } = matter(fileContents)

            const postData: PostData = {
                title: data.title as string,
                description: data.description as string,
                tags: data.tags as string[],
                createDate: data.createDate as Date,
                updateDate: data.updateDate as Date,
            }

            return {
                id,
                postData,
                content,
            }
        })

        const contents = await Promise.all(postsData)

        return contents
    }

    return {
        getPosts,
    }
}

export default usePosts
