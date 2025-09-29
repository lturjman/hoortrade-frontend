import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-zinc-50">
      <h1 className="text-4xl font-bold text-center mt-10">
        Hoortrade Product Manager
      </h1>

      <div className="w-full max-w-[70vh] space-y-4">
        <div className=" bg-white flex flex-col rounded-2xl shadow-lg overflow-hidden text-center p-5 dark:bg-zinc-800">
          <div className="text-xl font-bold">Bienvenue!</div>
          <div className=" ">
            Découvrez l'application de gestion de produits Hoortrade.
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/auth/login">
            <Button className="p-5 text-xl bg-cyan-600 hover:bg-cyan-700 dark:bg-white hover:dark:bg-zinc-100 dark:text-zinc-800">
              Se connecter
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="p-5 text-xl  bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white">
              Créer un compte
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
