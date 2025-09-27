"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/store/slices/products";
import Button from "@/components/Button";
import { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import ProductCard from "@/components/products/Card";
import Link from "next/link";

export default function productsList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Chargement...</div>;
  return (
    <div className="p-4 space-y-6 mt-4">
      {products.length === 0 ? (
        // Cas où il n'y a aucun produit
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-6 space-y-8 ">
          <Link href="/products/new">
            <div className="cursor-pointer transition-transform hover:scale-102 duration-300 ease-in-out">
              <div className="flex flex-col items-center justify-center w-64 aspect-video border-2 border-dashed backdrop-blur-md rounded-xl hover:border-cyan-600 hover:text-cyan-500 p-6 shadow-inner">
                <PlusIcon className="w-10 h-10" />
                <span className="mt-3 font-medium text-lg">
                  Ajouter un produit
                </span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        // Cas où il y a des produits
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}

            {/* Carte d'ajout en fin de liste */}
            <Link href="/products/new">
              <div className="hidden sm:flex h-full w-full  cursor-pointer transition-transform hover:scale-105 duration-300 ease-in-out flex-col items-center justify-center border-2 border-dashed backdrop-blur-md rounded-lg hover:text-cyan-500 hover:border-cyan-500 p-6 shadow-inner">
                <PlusIcon className="w-10 h-10" />
                <span className="mt-3 font-medium text-lg text-center">
                  Ajouter un produit
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      <div className="sm:hidden fixed bottom-6 right-6">
        <Link href="/products/new">
          <Button className="w-20 h-20 ring-2 ring-white shadow-lg shadow-purple-600/50">
            <PlusIcon className="size-9"></PlusIcon>
          </Button>
        </Link>
      </div>
    </div>
  );
}
