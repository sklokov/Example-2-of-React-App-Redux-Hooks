import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "@reduxjs/toolkit";
import newsMainPageReducer from "./news-page-reducer";

export const rootReducer = combineReducers({
    newsMainPage: newsMainPageReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
