import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CurrentCabinetState {
    name: string;
    id: string;
}

const initialState: CurrentCabinetState = {
    name: '',
    id: '',
};

export const CurrentCabinetSlice = createSlice({
    name: 'currentCabinet',
    initialState,
    reducers: {
        setCurrentCabinet: (
            state,
            action: PayloadAction<CurrentCabinetState>,
        ) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
    },
});

export const { setCurrentCabinet } = CurrentCabinetSlice.actions;

export const CurrentCabinetState = (state: RootState) => state.currentCabinet;

export default CurrentCabinetSlice.reducer;
