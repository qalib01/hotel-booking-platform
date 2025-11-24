"use client"

import { hotels, mealOptions } from "@/src/data/data";
import getDatesBetween from "@/src/helper/getDatesBetween";
import { useBooking } from "@/src/store/booking.store";
import { BookMarked, ChevronLeft, Hotel } from "lucide-react";
import ActionButton from "../ui/button";
import Select from "../ui/select";


const HotelListCard = () => {
    const { bookingData, setBookingData, setStep, mealData, setMealData } = useBooking();
    const isContinueBtnDisabled = !bookingData?.hotel;

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose your meal</h2>
                <p className="text-gray-600">Select your delicious meals prepared by our chefs</p>
            </div>

            <div className="space-y-6">
                <Select
                    icon={Hotel}
                    title="Hotel"
                    value={bookingData?.hotel}
                    onChange={(e) => setBookingData({ ...bookingData, hotel: Number(e.target.value) })}
                    options={hotels[bookingData?.destination || '']}
                    isConditional={!bookingData?.destination}
                />

                {bookingData?.hotel && mealOptions[bookingData.destination || ''] ? (
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden animate-fadeInUp">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-900">
                                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider w-1/2">Lunch</th>
                                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider w-1/2">Dinner</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 w-full">
                                    {getDatesBetween(bookingData.checkIn || '', bookingData.checkOut || '').map((date, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors duration-200 w-full">
                                            <td className="px-6 py-5 col-4">
                                                <div className="text-blue-900 text-sm">
                                                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 col-4">
                                                <Select
                                                    value={mealOptions[bookingData?.destination || ""]?.lunch?.find(m => m.id === mealData[date]?.lunch)?.id}
                                                    onChange={(e) => setMealData({ date, mealType: 'lunch', value: Number(e.target.value) })}
                                                    isDisabled={bookingData.boardType === 'NB' || bookingData.boardType === 'HB' && !!mealData?.[date]?.dinner}
                                                    options={mealOptions[bookingData.destination || '']?.lunch}
                                                    selectOption="Lunch"
                                                />
                                            </td>
                                            <td className="px-4 py-3 col-4">
                                                <Select
                                                    value={mealOptions[bookingData?.destination || ""]?.dinner?.find(m => m.id === mealData[date]?.dinner)?.id}
                                                    onChange={(e) => setMealData({ date, mealType: 'dinner', value: Number(e.target.value) })}
                                                    isDisabled={bookingData.boardType === 'NB' || bookingData.boardType === 'HB' && !!mealData?.[date]?.lunch}
                                                    options={mealOptions[bookingData.destination || '']?.dinner}
                                                    selectOption="Dinner"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : ''}
            </div>

            <div className="w-full flex gap-2 mt-4">
                <ActionButton
                    label="Back"
                    onClick={() => setStep(1)}
                    type="button"
                    icon={ChevronLeft}
                    baseColor="gray"
                />
                <ActionButton
                    label="Checkout"
                    onClick={() => setStep(3)}
                    type="button"
                    icon={BookMarked}
                    baseColor="blue"
                    disabled={isContinueBtnDisabled}
                />
            </div>
        </div>
    )
}

export default HotelListCard;