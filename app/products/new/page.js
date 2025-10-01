"use client";

import { useDispatch } from "react-redux";
import { fetchProducts } from "@/lib/store/slices/products";
import CreateProduct from "@/components/products/Create";
import Button from "@/components/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function NewProductPage() {
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <Button
        href={`/products`}
        rounded="true"
        className="absolute top-[12vh] left-6"
      >
        <ArrowLeftIcon className="size-5 text-white" />
      </Button>
      <div className="flex items-center justify-center flex-col min-h-[70vh]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Ajouter un nouveau Produit
        </h1>

        <CreateProduct onProductCreated={() => dispatch(fetchProducts())} />
      </div>
    </div>
  );
}
