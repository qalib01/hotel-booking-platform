"use client"

import { hotels, mealOptions } from "@/src/data/data";
import getDatesBetween from "@/src/helper/getDatesBetween";
import { useBooking } from "@/src/store/booking.store";
import cn from "classnames";
import { BookMarked, ChevronLeft, Hotel } from "lucide-react";


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
                {bookingData?.destination && (
                    <div className="relative group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Hotel className="w-4 h-4 text-blue-600" />
                            Hotels
                        </label>
                        <select
                            value={bookingData?.hotel}
                            onChange={(e) => setBookingData({ ...bookingData, hotel: Number(e.target.value) })}
                            className="w-full px-4 outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                            required
                        >
                            <option value="">Select hotel</option>
                            {hotels[bookingData.destination].map(h => (
                                <option key={h.id} value={h.id}>{h.name} - ${h.price}</option>
                            ))}
                        </select>
                    </div>
                )}

                {bookingData?.hotel && mealOptions[bookingData.destination || ''] ? (
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden animate-fadeInUp">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-900">
                                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Lunch</th>
                                        <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Dinner</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {getDatesBetween(bookingData.checkIn || '', bookingData.checkOut || '').map((date, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-colors duration-200">
                                            <td className="px-6 py-5">
                                                <div className="text-blue-900 text-sm">
                                                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <select
                                                    value={mealOptions[bookingData?.destination || ""]?.lunch?.find(m => m.id === mealData[date]?.lunch)?.id}
                                                    onChange={(e) => setMealData({ date, mealType: 'lunch', value: Number(e.target.value) })}
                                                    disabled={bookingData.boardType === 'NB' || bookingData.boardType === 'HB' && !!mealData?.[date]?.dinner}
                                                    className="w-full px-4 py-3 bg-white/90 backdrop-blur border-2 border-transparent rounded-xl cursor-pointer text-gray-800 font-medium focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 disabled:bg-gray-400/20 disabled:cursor-not-allowed disabled:text-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                >
                                                    <option value="">No lunch</option>
                                                    {mealOptions[bookingData.destination || '']?.lunch.map(meal => (
                                                        <option key={meal.id} value={meal.id}>
                                                            {meal.name} (${meal.price})
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-5">
                                                <select
                                                    value={mealOptions[bookingData?.destination || ""]?.dinner?.find(m => m.id === mealData[date]?.dinner)?.id}
                                                    onChange={(e) => setMealData({ date, mealType: 'dinner', value: Number(e.target.value) })}
                                                    disabled={bookingData.boardType === 'NB' || bookingData.boardType === 'HB' && !!mealData?.[date]?.lunch}
                                                    className="w-full px-4 py-3 bg-white/90 backdrop-blur border-2 border-transparent rounded-xl cursor-pointer text-gray-800 font-medium focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 disabled:bg-gray-400/20 disabled:cursor-not-allowed disabled:text-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                >
                                                    <option value="">No dinner</option>
                                                    {mealOptions[bookingData.destination || '']?.dinner.map(meal => (
                                                        <option key={meal.id} value={meal.id}>
                                                            {meal.name} (${meal.price})
                                                        </option>
                                                    ))}
                                                </select>
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
                <button
                    onClick={() => setStep(1)}
                    type="button"
                    className="w-full bg-gradient-to-br from-gray-600 to-gray-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Back
                    </span>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={isContinueBtnDisabled}
                    className={cn(
                        'w-full text-white py-4 rounded-xl font-bold text-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-xl  flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer',
                        { 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 hover:shadow-2xl hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-600': !isContinueBtnDisabled },
                        { 'bg-gray-500': isContinueBtnDisabled },
                    )}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <BookMarked className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Checkout
                    </span>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>
        </div>
    )
}

export default HotelListCard;