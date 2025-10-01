import UpdateProduct from "@/components/products/Update";

export default function UpdateProductPage({ params }) {
  const { productId } = params;

  return (
    <div className="flex flex-col items-center justify-center">
      <UpdateProduct productId={productId} />
    </div>
  );
}
