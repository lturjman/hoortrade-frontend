import Link from "next/link";
import ProductsList from "@/components/products/List";

export default function Login() {
  return (
    <div className="pt-6 text-center">
      <h1 className="text-4xl font-bold">Bienvenue !</h1>

      <ProductsList />
    </div>
  );
}
