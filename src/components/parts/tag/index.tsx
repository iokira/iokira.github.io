import Link from "@/components/parts/link"

const Tag = ({ name }: { name: string }) => {
    return <Link href={"/blog/tag/" + name}>{name}</Link>
}

export default Tag
