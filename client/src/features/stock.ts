import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface StockState {
    value: [];
}

const initialState: StockState = {
    value: [],
};

export const StockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        addStock: (state, action: PayloadAction<[]>) => {
            state.value = [...action.payload];
        },
    },
});

export const { addStock } = StockSlice.actions;

export const StockState = (state: RootState) => state.stock.value;

export default StockSlice.reducer;
