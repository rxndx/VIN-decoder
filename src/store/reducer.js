import { createSlice } from "@reduxjs/toolkit";
import { Api } from '../api/Api';
import { decodeVinUrl } from "../api/url";

const generateSlice = (sliceName, apiUrl) => {
    const api = new Api(apiUrl);

    const slice = createSlice({
        name: sliceName,
        initialState: {
            list: [],
        },
        reducers: {
            setItems: (state, action) => {
                state.list = action.payload;
            },
        },
    });

    const { setItems } = slice.actions;

    const fetchItems = () => async (dispatch) => {
        const data = await api.request();
        dispatch(setItems(data.Results || data));
    };

    const fetchOneItem = (vinInput) => async (dispatch) => {
        const url = decodeVinUrl(vinInput);
        const data = await api.request(url);
        dispatch(setItems(data.Results || data));
    };

    return {
        ...slice,
        fetchOneItem,
        fetchItems
    };
};

export default generateSlice;