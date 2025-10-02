import ProductsList from "@/components/products/List";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Login() {
  return (
    <ProtectedRoute>
      <div className="pt-6 text-center">
        <h1 className="text-4xl font-bold">Bienvenue !</h1>

        <ProductsList />
      </div>
    </ProtectedRoute>
  );
}
