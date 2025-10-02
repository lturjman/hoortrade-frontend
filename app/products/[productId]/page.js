import UpdateProduct from "@/components/products/Update";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function UpdateProductPage({ params }) {
  const { productId } = params;

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center">
        <UpdateProduct productId={productId} />
      </div>
    </ProtectedRoute>
  );
}
