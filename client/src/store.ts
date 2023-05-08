import { configureStore } from '@reduxjs/toolkit';
import CurrentCabinetSlice from './features/currentCabinet';
import CurrentStockSlice from './features/currentStock';
import FloorSlice from './features/floor';
import HostnameSlice from './features/hostname';
import OpenSidebarSlice from './features/openSidebar';
import StockSlice from './features/stock';

export const store = configureStore({
    reducer: {
        open: OpenSidebarSlice,
        hostname: HostnameSlice,
        stock: StockSlice,
        currentStock: CurrentStockSlice,
        currentCabinet: CurrentCabinetSlice,
        floor: FloorSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
