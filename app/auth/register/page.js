import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center pt-6 min-h-[90vh]">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold">Hoortrade</h1>
        </Link>
      </div>

      <h2 className="text-xl font-bold ">Inscription</h2>
      <RegisterForm />
    </div>
  );
}
