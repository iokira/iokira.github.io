import Tag from "@/components/parts/tag"
import style from "./index.module.scss"

const Tags = ({ tags }: { tags: string[] }) => {
    return (
        <div className={style["tags"]}>
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
