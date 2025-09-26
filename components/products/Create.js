"use client";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { createProduct } from "@/lib/store/slices/products";

import Button from "@/components/Button";
import { useState } from "react";

import { validateProduct } from "@/utils/validateProduct";

const productImages = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
  "/images/product4.jpg",
  "/images/product5.jpg",
  "/images/product6.jpg",
];

export default function CreateProduct({}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    imageUrl: productImages[0],
  });
  const [errors, setErrors] = useState({});

  const handleCreateProduct = async () => {
    const isValid = await validateProduct(product, setErrors);
    if (isValid) {
      const action = await dispatch(createProduct(product));
      if (createProduct.fulfilled.match(action)) {
        router.push(`/products/${action.payload._id}`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <label htmlFor="name">Nom du produit</label>
      <input
        type="text"
        name="name"
        className=" mt-2 appearance-none w-full p-2 focus:border rounded-md
             bg-zinc-100 text-zinc-800 focus:outline-none
             focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
        placeholder="Portail"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mb-4">{errors.name}</p>
      )}

      <label className="block mb-2">Choisir l'image du produit :</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {productImages.map((img) => (
          <button
            type="button"
            key={img}
            onClick={() => setProduct({ ...product, imageUrl: img })}
            className={`relative rounded-lg overflow-hidden border-2 transition 
              ${
                product.imageUrl === img
                  ? "border-cyan-600 shadow-lg shadow-zinc-300"
                  : "border-transparent"
              }`}
          >
            <img
              src={img}
              alt="Option de produit"
              className="w-full h-[15vh] md:h-[20vh] object-cover"
            />
          </button>
        ))}
      </div>

      <Button onClick={handleCreateProduct} className="my-4">
        Créer le produit
      </Button>
    </div>
  );
}
