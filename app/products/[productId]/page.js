import UpdateProduct from "@/components/products/Update";

export default function UpdateProductPage({ params }) {
  const { productId } = params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Le composant Update est côté client */}
      <UpdateProduct productId={productId} />
    </main>
  );
}
