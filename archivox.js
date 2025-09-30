export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col">

        {/* Header */}
        <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white flex justify-between items-center p-4 shadow-md">
          <h1 className="text-xl font-bold">Mi App</h1>

          {/* Botón hamburguesa en móvil */}
          <button
            className="md:hidden p-2 border rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          {/* Users en navbar (solo móvil) */}
          <div className="hidden md:flex gap-4">
            <Link href="/user/1">User 1</Link>
            <Link href="/user/2">User 2</Link>
            <Link href="/user/3">User 3</Link>
          </div>
        </header>

        {/* Perfil */}
        <div className="flex flex-row items-center justify-start bg-white p-4 gap-4 shadow-md overflow-x-auto">
          <Profile />
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar de usuarios */}
          <aside
            className={`
              fixed top-0 left-0 h-full w-56 bg-white shadow-2xl p-5 transform
              transition-transform duration-300 ease-in-out
              md:relative md:translate-x-0
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <button
              className="md:hidden mb-4 p-2 border rounded"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
            <Users />
          </aside>

          {/* Main content */}
          <main className="flex-1 bg-gray-100 shadow-2xl overflow-y-auto rounded-3xl p-5 ml-0 md:ml-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}