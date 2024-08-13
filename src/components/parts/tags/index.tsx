import Tag from "@/components/parts/tag"

const Tags = ({ tags }: { tags: string[] }) => {
    return (
        <div>
            {tags.map((tag) => (
                <Tag
                    key={tag}
                    name={tag}
                />
            ))}
        </div>
    )
}

export default Tags
