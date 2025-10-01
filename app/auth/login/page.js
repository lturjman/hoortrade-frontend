import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pt-6 min-h-[90vh]">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold">Hoortrade</h1>
        </Link>
      </div>

      <h2 className="text-xl font-bold">Connexion</h2>
      <LoginForm />
    </div>
  );
}
