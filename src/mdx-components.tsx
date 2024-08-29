import type { MDXComponents } from "mdx/types"
import "prismjs/themes/prism-tomorrow.css"
import Link from "./components/parts/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        a: ({ href, children }) => (
            <Link
                href={href}
                target="_blank"
            >
                {children}
            </Link>
        ),
        ...components,
    }
}
