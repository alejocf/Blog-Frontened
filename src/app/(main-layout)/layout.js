import Header from "@/components/layout/header";
import Profile from "@/components/layout/profile";
import Users from "@/components/layout/users";

export default function MainLayout({ children }) {
  return (
    <div className="grid w-full gap-x-6 gap-y-7 grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto] h-screen" >
    <header className="col-span-3 text-white bg-gradient-to-r from-indigo-600 to-indigo-500 " >
      <Header/>
    </header>

    <aside className="row-start-2 col-start-1 w-72 ml-6" >
      <Profile/>
    </aside>

    <main className="row-start-2 col-start-2 shadow-2xl overflow-y-auto flex rounded-3xl p-3.5" >
      {children}
    </main>

    <aside className="row-start-2 col-start-3 shadow-2xl w-56  p-5 rounded-2xl mr-6" >
      <Users/>
    </aside>
    </div>
  )
}