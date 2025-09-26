import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProduct = createAsyncThunk(
  "products/fetchOne",
  async (id) => {
    const response = await fetchWithAuth(
      `${NEXT_PUBLIC_API_URL}/products/${id}`
    );
    if (!response.ok)
      throw new Error("Erreur lors de la récupération du produit");
    const responseBody = await response.json();
    return responseBody.data;
  }
);

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await fetchWithAuth(`${NEXT_PUBLIC_API_URL}/products`);
  if (!response.ok)
    throw new Error("Erreur lors de la récupération des produits");
  const responseBody = await response.json();
  return responseBody.data;
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData) => {
    const response = await fetchWithAuth(`${NEXT_PUBLIC_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: productData }),
    });
    if (!response.ok) throw new Error("Erreur lors de la création du produit");
    const responseBody = await response.json();
    return responseBody.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (product) => {
    const response = await fetchWithAuth(
      `${NEXT_PUBLIC_API_URL}/products/${product._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      }
    );
    if (!response.ok)
      throw new Error("Erreur lors de la modification du produit");
    const responseBody = await response.json();
    return responseBody.data;
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const response = await fetchWithAuth(
    `${NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Erreur lors de la suppression du produit");
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Gestion de create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Gestion de update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.items.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Gestion de Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
