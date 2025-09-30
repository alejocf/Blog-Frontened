import NewPost from "@/components/posts/newPost";
import Posts from "@/components/posts/posts";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Posts />
    </ProtectedRoute>
  )
}
