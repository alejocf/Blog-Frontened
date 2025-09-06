import Link from "next/link";

export default function Header () {
  return (
    <header className="col-span-3 text-white" >
      <div className="flex justify-between p-3 items-center">
        <Link className="text-blue-500 font-extrabold" href='/'>Home</Link>
        <div className="flex w-32 justify-between">
          <Link className="bg-blue-500 p-2 rounded-lg" href='/login/' >Login</Link>
          <Link className="bg-blue-950 p-2 rounded-lg" href='/logout/'>Logout</Link>
        </div>
      </div>
    </header>
  )
}