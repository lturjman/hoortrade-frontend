"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { firstname: "", lastname: "", email: "", password: "" };

    if (!firstname) {
      newErrors.firstname = "Le prénom est obligatoire";
      valid = false;
    }

    if (!lastname) {
      newErrors.lastname = "Le nom est obligatoire";
      valid = false;
    }

    if (!email) {
      newErrors.email = "L'email n'est pas valide";
      valid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "L'email n'est pas valide";
        valid = false;
      }
    }

    if (!password) {
      newErrors.password = "Le mot de passe n'est pas valide";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      const newErrors = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      };

      if (data?.field === "firstname") {
        newErrors.firstname = "Ce prénom n'est pas valide";
      } else if (data?.field === "lastname") {
        newErrors.lastname = "Ce nom n'est pas valide";
      } else if (data?.field === "email") {
        newErrors.email = "Cet email n'est pas valide";
      } else {
        newErrors.email = "L'email n'est pas valide";
        newErrors.password = "Le mot de passe n'est pas valide";
      }

      setErrors(newErrors);
      return;
    }

    // Stocker le token
    localStorage.setItem("token", data.token);

    router.push("/products");
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleRegister}
        className="w-full flex flex-col gap-4"
      >
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            placeholder="John"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="appearance-none w-full p-2 focus:border rounded-md
             bg-zinc-100 text-zinc-800 focus:outline-none
             focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            placeholder="Doe"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            className="appearance-none w-full p-2 focus:border rounded-md
             bg-zinc-100 text-zinc-800 focus:outline-none
             focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            placeholder="contact@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none w-full p-2 focus:border rounded-md
             bg-zinc-100 text-zinc-800 focus:outline-none
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
             bg-zinc-100 text-zinc-800 focus:outline-none
             focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button type="submit">Créer un compte</Button>
      </form>

      <Button
        className="bg-zinc-400 hover:bg-zinc-500 active:bg-zinc-600 mt-4 w-70 mx-auto"
        onClick={() => router.push("/auth/login")}
      >
        Déjà un compte ?
      </Button>
    </div>
  );
}
