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

        updateAmountProductToListProduct: (state, action) => {
            // @ts-ignore
            let index = state.value.findIndex(
                // @ts-ignore
                (el) => el.FloorId === action.payload.FloorId,
            );

            if (index >= 0) {
                // @ts-ignore
                let tempIndex = state.value[index].ListProduct.findIndex(
                    //@ts-ignore
                    (el) => el._id === action.payload.id,
                );

                if (tempIndex >= 0) {
                    //@ts-ignore
                    state.value[index].ListProduct[tempIndex].Amount =
                        action.payload.amount;
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

        addOrUpdateProductToListProduct: (state, action) => {
            // @ts-ignore
            let index = state.value.findIndex(
                // @ts-ignore
                (el) => el.FloorId === action.payload.FloorId,
            );

            if (index >= 0) {
                // @ts-ignore
                let tempIndex = state.value[index].ListProduct.findIndex(
                    //@ts-ignore
                    (el) => el.IdProduct === action.payload.IdProduct,
                );

                if (tempIndex >= 0) {
                    //@ts-ignore
                    state.value[index].ListProduct[tempIndex].Amount =
                        //@ts-ignore
                        state.value[index].ListProduct[tempIndex].Amount +
                        action.payload.Amount;
                } else {
                    // @ts-ignore
                    state.value[index].ListProduct.push(action.payload);
                }
            }
        },
    },
});

export const {
    addListProducts,
    addProductToListProduct,
    updateProductToListProduct,
    deleteProductToListProduct,
    updateAmountProductToListProduct,
    addOrUpdateProductToListProduct,
} = ListProductSlice.actions;

export const ListProductState = (state: RootState) => state.listproducts.value;

export default ListProductSlice.reducer;
