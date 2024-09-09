import { configureStore } from '@reduxjs/toolkit';
import generateSlice from '../store/reducer';
import {variablesUrl} from "../api/url";

export const vinSlice = generateSlice('vin', '');
export const variablesSlice = generateSlice('variables', variablesUrl);

export const store = configureStore({
    reducer: {
        vin: vinSlice.reducer,
        variables: variablesSlice.reducer,
    },
});