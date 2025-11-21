import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./redux.store";
import { IBookingConfigs } from "../types/booking.type";
import { setBookingData, setStep } from "../redux/booking.slice";


export const useBooking = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bookingState = useSelector((state: RootState) => state.booking);

    return {
        ...bookingState,
        setBookingData: (data: IBookingConfigs | null) => dispatch(setBookingData(data)),
        setStep: (data: number | null) => dispatch(setStep(data)),
    }
}