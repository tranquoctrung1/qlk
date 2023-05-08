import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FloorState {
    value: [];
}

const initialState: FloorState = {
    value: [],
};

export const FloorSlice = createSlice({
    name: 'floor',
    initialState,
    reducers: {
        addFloor: (state, action: PayloadAction<[]>) => {
            state.value = [...action.payload];
        },
    },
});

export const { addFloor } = FloorSlice.actions;

export const FloorState = (state: RootState) => state.floor.value;

export default FloorSlice.reducer;
