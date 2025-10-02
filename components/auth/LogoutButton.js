"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearUsers } from "@/lib/store/slices/users";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LogoutForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const error = "Une erreur est survenue lors de la déconnexion";

  const handleLogout = async (e) => {
    dispatch(clearUsers());
    e.preventDefault();

    localStorage.removeItem("token");

    router.push("/");
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-400 text-white rounded-full hover:bg-red-500 active:bg-red-600 gap-2"
      >
        Déconnexion
      </Button>
    </div>
  );
}
