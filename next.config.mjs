import createMDX from "@next/mdx"
import rehypePrism from "rehype-prism"
import remarkGfm from "remark-gfm"

import 'prismjs/components/prism-lua.js'

const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    output: "export",
    reactStrictMode: true,
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    }
})

export default withMDX(nextConfig)
