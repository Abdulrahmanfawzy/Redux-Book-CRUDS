import { configureStore } from "@reduxjs/toolkit";
import bookSlice, { booksReducer, getbookReducer } from "../reducers/BookSlice";

export const store = configureStore({
    reducer:{
        books: bookSlice,
        allBooks: booksReducer,
        getBook: getbookReducer
    }
})