export async function validateProduct(Product, setErrors) {
  const newErrors = {};
  if (!Product.name || Product.name.trim() === "") {
    newErrors.name = "Le nom du produit est requis.";
  }

  if (Object.keys(newErrors).length > 0) {
    await setErrors(newErrors);
    return false;
  } else {
    return true;
  }
}
