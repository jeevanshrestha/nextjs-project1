import Link from "next/link"

export default function PostCard ({ post }: { post: any }){
    return (
        <Link href={post.uri} className={"card"}>
            <a className="card">
                <h3>{post.title} &rarr;</h3>
            </a>
        </Link>
    )
}