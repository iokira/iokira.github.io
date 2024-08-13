import type { MDXComponents } from "mdx/types"
import Link from "@/components/parts/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => <Link href={href}>{children}</Link>,
        hr: () => <hr />,
        ...components,
    }
}
