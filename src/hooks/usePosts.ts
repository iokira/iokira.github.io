import { readFileSync, readdirSync } from "fs"
import matter from "gray-matter"
import path from "path"

const postDir = path.join(process.cwd(), "src/posts")

const usePosts = () => {
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
        }

        return {
            id,
            postData,
            content,
        }
    }

    const getPosts = async () => {
        const fileNames = readdirSync(postDir)
        const postsData = fileNames.map((fileName) => getPost(fileName))

        const contents = await Promise.all(postsData)

        return contents
    }

    return {
        getPost,
        getPosts,
    }
}

export default usePosts
