import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Button from "@/components/Button";
import ProductParameters from "@/components/products/Update";

export default function ParametersPage({ params }) {
  const productId = params.productId;

  return (
    <div className="p-6">
      <Button
        href={`/products`}
        rounded="true"
        className="absolute top-[12vh] left-6"
      >
        <ArrowLeftIcon className="size-5 text-white" />
      </Button>
      <div className="flex items-center justify-center flex-col min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Modifier le produit
        </h1>

        <ProductParameters productId={productId} />
      </div>
    </div>
  );
}
