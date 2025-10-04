import Posts from "@/components/posts/allPosts";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Posts />
    </ProtectedRoute>
  )
}
