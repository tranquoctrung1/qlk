import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ListProduct {
    value: [];
}

const initialState: ListProduct = {
    value: [],
};

export const ListProductSlice = createSlice({
    name: 'listproducts',
    initialState,
    reducers: {
        addListProducts: (state, action: PayloadAction<[]>) => {
            state.value = [...action.payload];
        },

        addProductToListProduct: (state, action) => {
            // @ts-ignore
            let index = state.value.findIndex(
                // @ts-ignore
                (el) => el.FloorId === action.payload.FloorId,
            );

            if (index >= 0) {
                // @ts-ignore
                state.value[index].ListProduct.push(action.payload);
            }
        },

        updateProductToListProduct: (state, action) => {
            // @ts-ignore
            let index = state.value.findIndex(
                // @ts-ignore
                (el) => el.FloorId === action.payload.FloorId,
            );

            if (index >= 0) {
                // @ts-ignore
                let tempIndex = state.value[index].ListProduct.findIndex(
                    //@ts-ignore
                    (el) => el._id === action.payload._id,
                );

                if (tempIndex >= 0) {
                    // @ts-ignore
                    state.value[index].ListProduct[tempIndex] = action.payload;
                }
            }
        },

        deleteProductToListProduct: (state, action) => {
            // @ts-ignore
            let index = state.value.findIndex(
                // @ts-ignore
                (el) => el.FloorId === action.payload.FloorId,
            );

            if (index >= 0) {
                // @ts-ignore
                state.value[index].ListProduct = state.value[
                    index
                    // @ts-ignore
                ].ListProduct.filter(
                    // @ts-ignore
                    (el) => el._id !== action.payload._id,
                );
            }
        },
    },
});

export const {
    addListProducts,
    addProductToListProduct,
    updateProductToListProduct,
    deleteProductToListProduct,
} = ListProductSlice.actions;

export const ListProductState = (state: RootState) => state.listproducts.value;

export default ListProductSlice.reducer;
