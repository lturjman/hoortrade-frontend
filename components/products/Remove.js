"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { deleteProduct } from "@/lib/store/slices/products";

export default function RemoveProduct({ product, onClose }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const handleDeleteProduct = async () => {
    await dispatch(deleteProduct(product._id));
    router.push("/products");
  };

  return (
    <div className="space-y-4 p-2">
      <h2 className="block font-bold text-xl">
        Êtes vous sûr de vouloir supprimer le produit ?
      </h2>
      <div>Pour rappel, cette action est irréversible.</div>
      <div className="flex gap-4 ">
        <Button
          onClick={handleDeleteProduct}
          className=" bg-red-400 hover:bg-red-500 active:bg-red-600"
        >
          Oui, Supprimer
        </Button>

        <Button
          className="bg-zinc-400 hover:bg-zinc-500 active:bg-zinc-600"
          onClick={onClose}
        >
          Non, Annuler
        </Button>
      </div>
    </div>
  );
}
