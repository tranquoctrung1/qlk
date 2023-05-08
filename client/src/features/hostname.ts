import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface HostnameState {
    value: string;
}

const initialState: HostnameState = {
    value: 'http://localhost:3001/api',
};

export const HostnameSlice = createSlice({
    name: 'hostname',
    initialState,
    reducers: {},
});

export const HostnameState = (state: RootState) => state.hostname.value;
export default HostnameSlice.reducer;
