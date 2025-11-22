"use client"

import { countries, hotels } from "@/src/data/data";
import { useBooking } from "@/src/store/booking.store";
import cn from "classnames";
import { Calendar, ChevronRight, MapPin, Sparkles, Users } from "lucide-react";
import { useMemo } from "react";


const HotelFormCard = () => {
    const { bookingData, setBookingData, setStep } = useBooking();
    const isContinueBtnDisabled = !bookingData?.citizenship || !bookingData.checkIn || !bookingData.checkOut || !bookingData.destination || !bookingData.boardType;
    const today = new Date().toISOString().split('T')[0];

    const { minCheckoutDate, maxCheckoutDate } = useMemo(() => {
        if (!bookingData?.checkIn) {
            return {
                minCheckoutDate: '',
                maxCheckoutDate: ''
            };
        }

        const base = new Date(bookingData.checkIn);
        const min = new Date(base);
        min.setDate(min.getDate() + 2);
        const max = new Date(base);
        max.setDate(max.getDate() + 7);

        return {
            minCheckoutDate: min.toISOString().split("T")[0],
            maxCheckoutDate: max.toISOString().split("T")[0],
        };
    }, [bookingData?.checkIn]);

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Hotel</h2>
                <p className="text-gray-600">Search the best special deals for you</p>
            </div>

            <div className="space-y-6">
                <div className="relative group">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        Citizenship
                    </label>
                    <select
                        value={bookingData?.citizenship}
                        onChange={(e) => setBookingData({ ...bookingData, citizenship: Number(e.target.value) })}
                        className="w-full px-4 outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                        required
                    >
                        <option value="">Select country</option>
                        {countries.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            Check-in
                        </label>
                        <input
                            type="date"
                            min={today}
                            value={bookingData?.checkIn}
                            onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                            className="w-full px-4 outline-none py-3.5 bg-gray-50 cursor-pointer border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium hover:border-blue-300"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            Check-out
                        </label>
                        <input
                            type="date"
                            value={bookingData?.checkOut}
                            disabled={!bookingData?.checkIn}
                            onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                            min={minCheckoutDate}
                            max={maxCheckoutDate}
                            className="w-full px-4 py-3.5 outline-none bg-gray-50 cursor-pointer border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium hover:border-blue-300"
                            required
                        />
                    </div>
                </div>

                <div className="relative group">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        Destination
                    </label>
                    <select
                        value={bookingData?.destination}
                        onChange={(e) => setBookingData({ ...bookingData, destination: Number(e.target.value) })}
                        className="w-full px-4 outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                        required
                    >
                        <option value="">Select destination</option>
                        {countries.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {
                    !!bookingData?.destination && (
                        <div className="relative group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                Board type
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                <label className={cn(
                                    "flex items-center justify-between px-4 py-3.5 bg-gray-50 border-2 rounded-xl cursor-pointer transition-all duration-300",
                                    {
                                        "border-blue-500 bg-blue-50 shadow-md": bookingData.boardType === "FB",
                                        "border-gray-200 hover:border-blue-300": bookingData.boardType !== "FB",
                                    },
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                            {
                                                "border-blue-500 bg-blue-500": bookingData.boardType === 'FB',
                                                "border-gray-300": bookingData.boardType !== 'FB',
                                            })}
                                        >
                                            {bookingData.boardType === 'FB' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <input
                                            type="radio"
                                            name="boardType"
                                            value="FB"
                                            checked={bookingData.boardType === 'FB'}
                                            onChange={(e) => setBookingData({ ...bookingData, boardType: e.target.value })}
                                            className="hidden"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-800">Full Board</span>
                                            <p className="text-xs text-gray-600">Breakfast, Lunch & Dinner</p>
                                        </div>
                                    </div>
                                </label>

                                <label className={cn(
                                    "flex items-center justify-between px-4 py-3.5 bg-gray-50 border-2 rounded-xl cursor-pointer transition-all duration-300",
                                    {
                                        "border-blue-500 bg-blue-50 shadow-md": bookingData.boardType === "HB",
                                        "border-gray-200 hover:border-blue-300": bookingData.boardType !== "HB",
                                    },
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                            {
                                                "border-blue-500 bg-blue-500": bookingData.boardType === "HB",
                                                "border-gray-300": bookingData.boardType !== "HB",
                                            })}
                                        >
                                            {bookingData.boardType === 'HB' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <input
                                            type="radio"
                                            name="boardType"
                                            value="HB"
                                            checked={bookingData.boardType === 'HB'}
                                            onChange={(e) => setBookingData({ ...bookingData, boardType: e.target.value })}
                                            className="hidden"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-800">Half Board</span>
                                            <p className="text-xs text-gray-600">Breakfast & One Meal</p>
                                        </div>
                                    </div>
                                </label>

                                <label className={cn(
                                    "flex items-center justify-between px-4 py-3.5 bg-gray-50 border-2 rounded-xl cursor-pointer transition-all duration-300",
                                    {
                                        "border-blue-500 bg-blue-50 shadow-md": bookingData.boardType === "NB",
                                        "border-gray-200 hover:border-blue-300": bookingData.boardType !== "NB",
                                    },
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                                            {
                                                "border-blue-500 bg-blue-500": bookingData.boardType === "NB",
                                                "border-gray-300": bookingData.boardType !== "NB",
                                            })}
                                        >
                                            {bookingData.boardType === 'NB' && (
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            )}
                                        </div>
                                        <input
                                            type="radio"
                                            name="boardType"
                                            value="NB"
                                            checked={bookingData.boardType === 'NB'}
                                            onChange={(e) => setBookingData({ ...bookingData, boardType: e.target.value })}
                                            className="hidden"
                                        />
                                        <div>
                                            <span className="font-semibold text-gray-800">No Board</span>
                                            <p className="text-xs text-gray-600">No Meals Included</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )
                }

                <button
                    onClick={() => setStep(2)}
                    disabled={isContinueBtnDisabled}
                    className={cn(
                        'w-full text-white py-4 rounded-xl font-bold text-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-xl  flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer',
                        { 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 hover:shadow-2xl hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-600': !isContinueBtnDisabled },
                        { 'bg-gray-500': isContinueBtnDisabled },
                    )}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Continue to Meal Selection
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Best Price Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                        <span>Free Cancellation</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelFormCard;