import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./redux.store";
import { IBookingConfigs, MealData } from "../types/booking.type";
import { setBookingData, setMealData, setStep } from "../redux/booking.slice";


export const useBooking = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bookingState = useSelector((state: RootState) => state.booking);

    return {
        ...bookingState,
        setBookingData: (data: IBookingConfigs | null) => dispatch(setBookingData(data)),
        setStep: (data: number | null) => dispatch(setStep(data)),
        setMealData: (data: { date: string; mealType: 'lunch' | 'dinner'; value: number | null }) => dispatch(setMealData(data)),
        //
    }
}