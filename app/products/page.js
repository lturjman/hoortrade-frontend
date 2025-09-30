import Link from "next/link";
import ProductsList from "@/components/products/List";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Login() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-zinc-50 dark:bg-zinc-800">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>

      <div className="pt-16 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold">
            Bienvenue sur Hoortrade Product Manager !
          </h1>
        </Link>

        <ProductsList />
      </div>
    </main>
  );
}
