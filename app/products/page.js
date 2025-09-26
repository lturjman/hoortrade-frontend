import Link from "next/link";
import ProductsList from "@/components/products/List";

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-zinc-50">
      <div>
        <Link href="/">
          <h1 className="text-4xl font-bold text-center">
            Bienvenue sur Hoortrade Product Manager !
          </h1>
        </Link>

        <ProductsList />
      </div>
    </main>
  );
}
