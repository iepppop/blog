import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, query, where, onSnapshot, getDocs, doc, addDoc } from "firebase/firestore";
import { db } from '../firebase.js' ;

export const fetchData = createAsyncThunk('user/fetchData', async (cateName, thunkAPI) => {
    try {
        const querySnapshot = await getDocs(collection(db, "list", '6rIGBZV7WPHNUXGm3KyY', cateName));
        const dataList = [];
        querySnapshot.forEach((doc) => {
            dataList.push({ id: doc.id, ...doc.data() }); 
        });
        return dataList;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});
const initialState = {
    data: null,
    isLoading: false,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchData.pending, (state, action) => {
            state.data = null;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            console.log(action.payload)
            state.data = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchData.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
});

export const { data } = dataSlice.actions;
export default dataSlice.reducer;

