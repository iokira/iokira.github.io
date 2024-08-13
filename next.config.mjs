import createMDX from "@next/mdx"
import rehypePrism from "rehype-prism"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import 'prismjs/components/prism-lua.js'

const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    output: "export",
    reactStrictMode: true,
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        rehypePlugins: [rehypePrism],
    }
})

export default withMDX(nextConfig)
