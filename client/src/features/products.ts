import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ProductState {
    value: [];
}

const initialState: ProductState = {
    value: [],
};

export const ProductSilce = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<[]>) => {
            state.value = [...action.payload];
        },

        addProduct: (state, action) => {
            // @ts-ignore
            state.value.push(action.payload);
        },

        updateProduct: (state, action) => {
            // @ts-ignore
            let index = state.value.findIndex(
                // @ts-ignore
                (el) => el._id === action.payload.id,
            );

            if (index >= 0) {
                // @ts-ignore
                state.value[index] = action.payload;
            }
        },

        deleteProduct: (state, action) => {
            // @ts-ignore
            state.value = state.value.filter(
                // @ts-ignore
                (el) => el._id !== action.payload,
            );
        },
    },
});

export const { addProducts, addProduct, updateProduct, deleteProduct } =
    ProductSilce.actions;

export const ProductState = (state: RootState) => state.products.value;

export default ProductSilce.reducer;
