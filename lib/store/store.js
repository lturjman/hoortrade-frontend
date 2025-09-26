import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import users from "./slices/users";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  products,
  users,
});

const persistConfig = { key: "Hoortrade", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

export { store, persistor };
export default store;
