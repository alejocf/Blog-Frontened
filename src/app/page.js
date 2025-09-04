import Contacts from "@/components/contacts";
import Main from "@/components/main";
import Profile from "@/components/profile";

export default function Home() {
  return (
    <div className="grid w-full gap-2 grid-rows-[auto_1fr] grid-cols-[auto_1fr_auto]" >
      <Profile/>
      <Main/>
      <Contacts/>
    </div>
  )
}
