import createMDX from '@next/mdx'

const nextConfig = {
    pageExtensions: [
        'js', 'jsx', 'ts', 'tsx', 'md', 'mdx'
    ],
    output: 'export'
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
