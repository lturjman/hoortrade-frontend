import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-zinc-50">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold">Hoortrade</h1>
        </Link>
      </div>

      <h2 className="text-xl font-bold">Connexion</h2>
      <LoginForm />
    </main>
  );
}
