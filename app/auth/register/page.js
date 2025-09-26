import Image from "next/image";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-zinc-50 bg-cover bg-center bg-no-repeat  bg-[url('/images/bg-4.jpg')] dark:bg-[url('/images/bg-5.jpg')]">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold">Hoortrade</h1>
        </Link>
      </div>

      <h2 className="text-xl font-bold ">Inscription</h2>
      <RegisterForm />
    </main>
  );
}
