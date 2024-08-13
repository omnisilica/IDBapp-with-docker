import { configureStore } from "@reduxjs/toolkit";
import mortgageSlice from "./mortgage-account-slice";

const store = configureStore({
    reducer: {
        mortgage: mortgageSlice.reducer
    }
});

export default store;