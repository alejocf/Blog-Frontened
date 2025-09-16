import Main from "@/components/posts/main";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Main/>
    </ProtectedRoute>
  )
}
