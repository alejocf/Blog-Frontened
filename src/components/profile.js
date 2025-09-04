import Link from "next/link";
import Login from "./login";

export default function Profile () {
  return (
    <aside className="row-start-2 col-start-1 bg-fuchsia-800" >
      Profile
      <Link href='/my-posts/'>My Posts</Link>
    </aside>
  )
}