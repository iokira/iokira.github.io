import { Heading } from '@chakra-ui/react'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <Heading>{children}</Heading>
        ),
        ...components,
    }
}
