import CreateAccount from "@/components/authentication/createAccount";
import Login from "@/components/authentication/login";

export default function AuthView () {
  return (
    <section className="flex " >
      <Login></Login>
      <CreateAccount></CreateAccount>
    </section>
  )
}