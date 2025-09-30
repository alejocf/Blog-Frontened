import Header from "@/components/layout/header";
import Profile from "@/components/layout/profile";
import Users from "@/components/layout/users";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function MainLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col w-full md:grid md:grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">

      <header className="col-span-3 text-white bg-gradient-to-r from-indigo-600 to-indigo-500">
        <Header />
      </header>

      <aside className="row-start-2 col-start-1 w-full md:w-72 md:ml-6">
        <Profile />
      </aside>

      <main className="row-start-2 col-start-2 flex-1 shadow-2xl overflow-y-auto rounded-3xl p-3.5">
        {children}
      </main>

      <aside className="hidden lg:block lg:row-start-2 lg:col-start-3 lg:shadow-2xl lg:w-56 lg:p-5 lg:rounded-2xl lg:mr-6">
        <Users />
      </aside>
      </div>

    </ProtectedRoute>
  )
}