import type { MDXComponents } from "mdx/types"
import Link from "next/link"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <header>{children}</header>,
        h2: ({ children }) => <header>{children}</header>,
        h3: ({ children }) => <header>{children}</header>,
        h4: ({ children }) => <header>{children}</header>,
        h5: ({ children }) => <header>{children}</header>,
        h6: ({ children }) => <header>{children}</header>,
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => <Link href={href}>{children}</Link>,
        hr: () => <hr />,
        ...components,
    }
}
