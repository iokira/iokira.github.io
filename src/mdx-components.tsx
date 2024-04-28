import { Heading } from "@chakra-ui/react"
import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <Heading
                as="h1"
                size="4xl"
            >
                {children}
            </Heading>
        ),
        h2: ({ children }) => (
            <Heading
                as="h2"
                size="3xl"
            >
                {children}
            </Heading>
        ),
        h3: ({ children }) => (
            <Heading
                as="h3"
                size="2xl"
            >
                {children}
            </Heading>
        ),
        h4: ({ children }) => (
            <Heading
                as="h4"
                size="xl"
            >
                {children}
            </Heading>
        ),
        h5: ({ children }) => (
            <Heading
                as="h5"
                size="lg"
            >
                {children}
            </Heading>
        ),
        h6: ({ children }) => (
            <Heading
                as="h6"
                size="md"
            >
                {children}
            </Heading>
        ),
        ...components,
    }
}
