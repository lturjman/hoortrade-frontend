"use client";

import RemoveProduct from "./Remove";

import Button from "@/components/Button";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "@/lib/store/slices/products";

import { validateProduct } from "@/utils/validateProduct";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";

const productImages = ["/images/product1.jpg", "/images/product2.jpg"];

export default function ProductParameters({ onClose, productId }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const product = useSelector((state) =>
    state.products.items?.find((product) => product._id === productId)
  );

  const [editableProduct, setEditableProduct] = useState({ ...product });
  let [displayRemoveProduct, setDisplayRemoveProduct] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (product) setEditableProduct(product);
  }, [product]);

  const handleUpdateProduct = async () => {
    const isValid = await validateProduct(editableProduct, setErrors);
    if (isValid) {
      const action = await dispatch(updateProduct(editableProduct));
      if (updateProduct.fulfilled.match(action)) {
        setSuccess(true);
        if (onClose) onClose();
      }
    }
  };

  return (
    <div className="space-y-4 p-2">
      <label htmlFor="name">Nom du produit</label>
      <input
        type="text"
        name="name"
        className="appearance-none w-full p-2 focus:border rounded-md
             bg-zinc-100 text-zinc-800 focus:outline-none
             focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600 dark:bg-zinc-600 dark:text-zinc-200"
        placeholder="Portail"
        value={editableProduct.name}
        onChange={(e) =>
          setEditableProduct({ ...editableProduct, name: e.target.value })
        }
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <label className="block mt-4 mb-2">Choisir l'image du produit :</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {productImages.map((img) => (
          <button
            type="button"
            key={img}
            onClick={() =>
              setEditableProduct({ ...editableProduct, imageUrl: img })
            }
            className={`relative rounded-lg overflow-hidden border-2 transition 
              ${
                editableProduct.imageUrl === img
                  ? "border-cyan-600 shadow-lg shadow-zinc-300 dark:shadow-zinc-900"
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

      <div>
        <Button onClick={handleUpdateProduct} disabled={loading}>
          {" "}
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </Button>
        {success && (
          <p className="text-zinc-600 dark:text-zinc-300 text-sm text-center mt-2">
            {" "}
            ✅ Mise à jour réussie
          </p>
        )}
      </div>
      <Button
        className="bg-zinc-400 hover:bg-zinc-500 active:bg-zinc-600 mx-auto "
        href={`/products`}
      >
        Retour à l'accueil
      </Button>

      <hr className="my-6 border-zinc-400"></hr>
      <h2 className="block font-bold text-2xl"> Supprimer le produit :</h2>
      <div>Attention, le produit sera supprimé définitivement.</div>
      <div>
        <Button
          onClick={() => setDisplayRemoveProduct(true)}
          className=" bg-red-400 hover:bg-red-500 active:bg-red-600"
        >
          Supprimer le produit
        </Button>
      </div>

      <Dialog
        open={displayRemoveProduct}
        onClose={() => setDisplayRemoveProduct(false)}
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 dark:bg-black/70 p-4 z-50"
      >
        <DialogBackdrop className="fixed inset-0" />
        <div className="fixed p-4 w-full flex justify-center">
          <DialogPanel className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 dark:bg-zinc-700">
            <RemoveProduct
              product={product}
              onClose={() => setDisplayRemoveProduct(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
