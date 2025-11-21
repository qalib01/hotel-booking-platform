import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookingConfigs, MealData } from "../types/booking.type";


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
    mealData: MealData,
    step: number | null;
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingData: (state, action: PayloadAction<IBookingConfigs | null>) => {
            state.bookingData = action.payload;
        },
        setMealData: (
            state,
            action: PayloadAction<{ date: string; mealType: 'lunch' | 'dinner'; value: number | null }>
        ) => {
            const { date, mealType, value } = action.payload;

            if (!state.mealData[date]) {
                state.mealData[date] = { lunch: null, dinner: null };
            }

            state.mealData[date][mealType] = value;
        },
        setStep: (state, action: PayloadAction<number | null>) => {
            state.step = action.payload;
        }
    }
});

export const {
    setBookingData,
    setMealData,
    setStep,
    // 
} = bookingSlice.actions;

export default bookingSlice.reducer;