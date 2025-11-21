import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "../redux/booking.slice"


export const store = configureStore({
    reducer: {
        booking: bookingReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;