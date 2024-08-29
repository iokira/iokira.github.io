import Link from "@/components/parts/link"
import style from "./index.module.scss"

const Tag = ({ name }: { name: string }) => {
    return (
        <div className={style["tag"]}>
            <Link href={"/blog/tag/" + name}>{name}</Link>
        </div>
    )
}

export default Tag
