"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import localStorage from "redux-persist/es/storage";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  async function redirectIfLoggedOut() {
    const token = await localStorage.getItem("token");
    if (!token) {
      router.replace("/");
    }
  }
  useEffect(() => {
    redirectIfLoggedOut();
  }, [router]);

  return children;
}
