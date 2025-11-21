import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookingConfigs } from "../types/booking.type";
import { IMeal } from "../types/data.type";

const initialState = {
    bookingData: {
        citizenship: '',
        destination: '',
        checkIn: '',
        hotel: '',
        checkOut: '',
        boardType: '',
    },
    mealData: {},
    step: 1,
} as {
    bookingData: IBookingConfigs | null;
    mealData: IMeal | null,
    step: number | null;
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingData: (state, action: PayloadAction<IBookingConfigs | null>) => {
            state.bookingData = action.payload;
        },
        setMealData: (state, action: PayloadAction<IMeal | null>) => {
            state.mealData = action.payload;
        },
        setStep: (state, action: PayloadAction<number | null>) => {
            state.step = action.payload;
        }
    }
});

export const {
    setBookingData,
    setStep,
    // 
} = bookingSlice.actions;

export default bookingSlice.reducer;