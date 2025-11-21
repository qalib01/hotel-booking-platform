"use client"

import { hotels } from "@/src/data/data";
import { useBooking } from "@/src/store/booking.store";
import { Hotel } from "lucide-react";


const HotelListCard = () => {
    const { bookingData, setBookingData } = useBooking();

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
                            onChange={(e) => setBookingData({ ...bookingData, hotel: e.target.value })}
                            className="w-full px-4 outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                            required
                        >
                            <option value="">Select hotel</option>
                            {hotels[bookingData.destination].map(h => (
                                <option key={h.id} value={h.name}>{h.name} - ${h.price}</option>
                            ))}
                        </select>
                    </div>
                )}

                {bookingData?.hotel && (
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
                                {/* <tbody className="divide-y divide-white/10">
                            {dates.map((date, idx) => (
                                <tr key={date} className="hover:bg-white/5 transition-colors duration-200">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <div className="text-white font-semibold">Day {idx + 1}</div>
                                                <div className="text-purple-200 text-sm">
                                                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={dailyMeals[date]?.lunch || ''}
                                            onChange={(e) => handleMealChange(date, 'lunch', e.target.value)}
                                            disabled={formData.boardType === 'NB' || (formData.boardType === 'HB' && dailyMeals[date]?.dinner)}
                                            className="w-full px-4 py-3 bg-white/90 backdrop-blur border-2 border-transparent rounded-xl text-gray-800 font-medium focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 disabled:bg-gray-400/20 disabled:cursor-not-allowed disabled:text-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <option value="">No lunch</option>
                                            {meals[formData.destination]?.lunch.map(meal => (
                                                <option key={meal.id} value={meal.id}>
                                                    {meal.name} (${meal.price})
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-5">
                                        <select
                                            value={dailyMeals[date]?.dinner || ''}
                                            onChange={(e) => handleMealChange(date, 'dinner', e.target.value)}
                                            disabled={formData.boardType === 'NB' || (formData.boardType === 'HB' && dailyMeals[date]?.lunch)}
                                            className="w-full px-4 py-3 bg-white/90 backdrop-blur border-2 border-transparent rounded-xl text-gray-800 font-medium focus:ring-4 focus:ring-pink-500/50 focus:border-pink-400 disabled:bg-gray-400/20 disabled:cursor-not-allowed disabled:text-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <option value="">No dinner</option>
                                            {meals[formData.destination]?.dinner.map(meal => (
                                                <option key={meal.id} value={meal.id}>
                                                    {meal.name} (${meal.price})
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody> */}
                            </table>
                        </div>
                    </div>
                )}
            </div>


            {/* <button
                    type="submit"
                    className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Search Hotels
                    </span>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button> */}
        </div>
    )
}

export default HotelListCard;