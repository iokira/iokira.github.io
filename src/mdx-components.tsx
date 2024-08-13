import type { MDXComponents } from "mdx/types"
import "prismjs/themes/prism-tomorrow.css"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...components,
    }
}
