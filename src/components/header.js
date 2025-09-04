import Link from "next/link";

export default function Header () {
  return (
    <header className="col-span-3 bg-cyan-900" >
      <Link href='/'>Home</Link>
      <Link href='/login/'>Login</Link>
      <Link href='/logout/'>Logout</Link>
    </header>
  )
}