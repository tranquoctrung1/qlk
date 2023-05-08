import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CurrentStockState {
    name: string;
    id: string;
}

const initialState: CurrentStockState = {
    name: '',
    id: '',
};

export const CurrentStockSlice = createSlice({
    name: 'currentStock',
    initialState,
    reducers: {
        setCurrentStock: (state, action: PayloadAction<CurrentStockState>) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
    },
});

export const { setCurrentStock } = CurrentStockSlice.actions;

export const CurrentStockState = (state: RootState) => state.currentStock;

export default CurrentStockSlice.reducer;
