"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "L'email est obligatoire";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "L'email n'est pas valide";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Le mot de passe est obligatoire";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async (e) => {
    const newErrors = { email: "", password: "" };

    e.preventDefault();
    if (!validateForm()) return;

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 400) {
        setErrors({ email: "", password: "Mot de passe incorrect" });
      } else {
        setErrors({ email: "", password: "Une erreur est survenue" });
      }
      return;
    }

    localStorage.setItem("token", data.token);

    router.push("/products");
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleLogin}
        className="w-full flex flex-col gap-4"
      >
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            placeholder="contact@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none w-full p-2 focus:border rounded-md
    bg-white text-zinc-800 focus:outline-none
    focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            placeholder="************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none w-full p-2 focus:border rounded-md
    bg-white text-zinc-800 focus:outline-none
    focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button type="submit">Se connecter</Button>
      </form>

      <Button
        className="bg-zinc-400 hover:bg-zinc-500 active:bg-zinc-600 mt-4 w-70 mx-auto"
        onClick={() => router.push("/auth/register")}
      >
        Pas encore de compte ?
      </Button>
    </div>
  );
}
