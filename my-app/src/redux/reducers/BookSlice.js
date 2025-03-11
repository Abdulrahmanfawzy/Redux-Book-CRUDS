import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {data: [] , isLoading: false , error: ""}

export const addBook = createAsyncThunk("books/addBook" , async (book , thunkApi)=>{
    try{
        const {data} = await axios.post("http://localhost:3000/data" , book);
        return data
    }
    catch(err){
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(err.message);
    }
})

const bookSlice = createSlice({
    name: "books",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(addBook.pending , (state , action)=>{
            state.isLoading = true;
            state.error = "";
            return state
        }).addCase(addBook.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.error = "";
            state.data = action.payload;
            return state
        }).addCase(addBook.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            return state
        })
    }
})

// ------------------------------------------------

export const getAllBooks = createAsyncThunk("allBooks/getAllBooks" , async (arg,thunkApi)=>{
    try{
        const {data} = await axios.get("http://localhost:3000/data");
        return data
    }
    catch(err){
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(err.message);
    }
})

export const deleteBook = createAsyncThunk("allBooks/deleteBook" , async (arg , thunkApi)=>{
    try {
        const {data} = await axios.delete(`http://localhost:3000/data/${arg}`);
        console.log(data);
        return data
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
}) 

const allBooksSlice = createSlice({
    name: "allBooks",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getAllBooks.pending , (state , action)=>{
            state.isLoading = true;
            state.error = "";
            return state
        }).addCase(getAllBooks.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.error = "";
            state.data = action.payload;
            return state
        }).addCase(getAllBooks.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            return state
        })

        // -----------------------------------------------------------
        
        builder.addCase(deleteBook.pending , (state , action)=>{
            state.isLoading = true;
            state.error = "";
            return state
        }).addCase(deleteBook.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.error = "";
            state.data = state.data.filter(item=>item.id != action.payload.id)
            return state
        }).addCase(deleteBook.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            return state
        })
    }
})

// ------------------------------------------------

export const oneBook = createAsyncThunk("oneBookName/oneBook" , async (arg,thunkApi)=>{
    try {
        const {data} = await axios.get(`http://localhost:3000/data/${arg}`)
        return data
    } catch (error) {
        const {rejectWithValue} = thunkApi;
        return rejectWithValue(error.message);
    }
})

const oneBookSlice = createSlice({
    name: "oneBookName",
    initialState: {data: {} , isLoading: false , error: ""},
    extraReducers: (builder)=>{
        builder.addCase(oneBook.pending , (state , action)=>{
            state.isLoading = true;
            state.error = "";
            return state
        }).addCase(oneBook.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.error = "";
            state.data = action.payload;
            return state
        }).addCase(oneBook.rejected , (state , action)=>{
            state.isLoading = false;
            state.error = action.payload;
            return state
        })
    }
})

export const getbookReducer = oneBookSlice.reducer;
export const booksReducer = allBooksSlice.reducer;
export default bookSlice.reducer