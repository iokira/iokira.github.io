import createMDX from "@next/mdx"
import rehypePrism from "rehype-prism"
import rehypeMathjax from "rehype-mathjax"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-rust.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-lua.js'
import rehypeSlug from "rehype-slug"
import remarkToc from "remark-toc"

const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    output: "export",
    reactStrictMode: true,
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [
            remarkGfm, 
            remarkFrontmatter, 
            remarkMath, 
            [remarkToc, { maxDepth: 3, heading: "目次" }]
        ],
        rehypePlugins: [rehypePrism, rehypeMathjax, rehypeSlug],
    }
})

export default withMDX(nextConfig)
