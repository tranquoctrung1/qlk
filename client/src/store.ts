import { configureStore } from '@reduxjs/toolkit';
import CurrentCabinetSlice from './features/currentCabinet';
import CurrentStockSlice from './features/currentStock';
import FloorSlice from './features/floor';
import HostnameSlice from './features/hostname';
import ListProductSlice from './features/listProduct';
import OpenSidebarSlice from './features/openSidebar';
import ProductSlice from './features/products';
import StockSlice from './features/stock';

export const store = configureStore({
    reducer: {
        open: OpenSidebarSlice,
        hostname: HostnameSlice,
        stock: StockSlice,
        currentStock: CurrentStockSlice,
        currentCabinet: CurrentCabinetSlice,
        floor: FloorSlice,
        products: ProductSlice,
		listproducts: ListProductSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['products/updateProduct'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.ImportDate'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
