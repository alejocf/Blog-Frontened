import Contacts from "@/components/layout/contacts";
import Header from "@/components/layout/header";
import Profile from "@/components/layout/profile";
import { AuthProvider } from "@/contexts/authContext";

export default function MainLayout({ children }) {
  return (
    <div className="grid w-full gap-x-6 gap-y-7 grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto] h-screen" >
      <Header/>
      <Profile/>
      {children}
      <Contacts/>
    </div>
  )
}