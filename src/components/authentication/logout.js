'use client'
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ImExit } from "react-icons/im";

export default function Logout () {
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    router.push('/login/')
  }


  return (
    <div className="flex justify-center bg-indigo-500 p-8 h-screen">
      <div className="flex flex-col justify-center items-center bg-white p-8 w-96 rounded-2xl" >
        {/* <ImExit className="text-9xl mb-8" /> */}
        <Image
          className="rounded-full mb-7"
          src="/logout-image.png"
          alt="Logout image"
          width={200}
          height={200}
        />

        <span>
          Oh no! You're leaving...
        </span>

        <span className="mb-2.5" >
          Are you sure?
        </span>

        <div className="" >
          <span className="flex justify-center bg-indigo-500 text-white px-3 py-2 rounded-4xl w-52 mb-2.5" >
            <Link href='/' >
              Naah, Just Kidding
            </Link>
          </span>

          <span onClick={handleSubmit} className="flex justify-center bg-indigo-50 border border-indigo-500 text-indigo-500 px-2.5 py-2 rounded-4xl w-52 cursor-pointer" >
            {/* <button onClick={handleSubmit} className= > */}
              Yes, Log Me Out
            {/* </button> */}
          </span>
        </div>

        {/* <div>
          <span>Yes</span>
          <button onClick={handleSubmit}>Logout</button>
        </div>

        <div>
          <span>No</span>
          <Link href='/'>Redirect</Link>
        </div> */}
      </div>

    </div>
  )
}