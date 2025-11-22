"use client"

import { boardTypes, countries, hotels, mealOptions } from "@/src/data/data";
import getDatesBetween from "@/src/helper/getDatesBetween";
import { useBooking } from "@/src/store/booking.store";
import { Calendar, Coins, Handshake, Hotel, MapPin, Sparkles, Users } from "lucide-react";


const BookingSummaryCard = () => {
    const { bookingData, mealData } = useBooking();

    const totalStay = getDatesBetween(bookingData?.checkIn || '', bookingData?.checkOut || '').length - 1;
    const selectedCitizenship = countries[bookingData?.citizenship || 0];
    const selectedDestination = countries[bookingData?.destination || 0];
    const selectedBoardType = boardTypes.find(type => type.code === bookingData?.boardType);
    const selectedHotel = hotels[bookingData?.destination || 0].find(hotel => hotel.id === Number(bookingData?.hotel));

    const selectedMealOption = mealOptions[bookingData?.destination || 0];
    const selectedMealIds = Object.values(mealData).flatMap(day => [day.lunch, day.dinner].filter((id): id is number => id !== null && id !== undefined));
    const allAvaliableMeals = [
        ...selectedMealOption.lunch,
        ...selectedMealOption.dinner,
    ];

    const idCounts: Record<number, number> = selectedMealIds.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    const selectedMealsTotal = allAvaliableMeals.reduce((sum, item) => {
        if (idCounts[item.id]) {
            return sum + item.price * idCounts[item.id];
        }
        return sum;
    }, 0);

    const totalPrice = selectedHotel?.price! + selectedMealsTotal;

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Check your reservation</h2>
                <p className="text-gray-600">Check your perfect staying experience in below section</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Users className="w-5 h-5 text-blue-600" />
                        Citizenship:
                    </div>
                    <p className="text-lg font-semibold text-gray-700"> {selectedCitizenship.name} </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        Dates:
                    </div>
                    <p className="text-lg font-semibold text-gray-700"> {bookingData?.checkIn}/{bookingData?.checkOut} (Total: {totalStay}) </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        Destination:
                    </div>
                    <p className="text-lg font-semibold text-gray-700"> {selectedDestination?.name} </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        Board type:
                    </div>
                    <p className="text-lg font-semibold text-gray-700"> {selectedBoardType?.name} </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Hotel className="w-5 h-5 text-blue-600" />
                        Hotel:
                    </div>
                    <p className="text-lg font-semibold text-gray-700"> {selectedHotel?.name} </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Hotel className="w-5 h-5 text-blue-600" />
                        Meals:
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                        {Object.entries(mealData).length > 0 ? Object.entries(mealData).map(([date, meals]) => {
                            return (
                                <span key={date} className="block">
                                    <span className="text-blue-900">{date} —{" "}</span>
                                    Lunch ({selectedMealOption.lunch.find(l => l.id === meals.lunch)?.name || 'Not selected'}){", "}
                                    Dinner ({selectedMealOption.dinner.find(l => l.id === meals.dinner)?.name || 'Not selected'}){" "}
                                </span>
                            );
                        }) : 'No meal selection'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                        <Coins className="w-5 h-5 text-blue-600" />
                        Price:
                    </div>
                    <p className="text-lg font-semibold text-gray-700">
                        ${totalPrice}
                    </p>
                </div>
            </div>

            <button
                type="button"
                // onClick={() => setStep(3)}
                className='w-full mt-4 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 hover:shadow-2xl hover:shadow-blue-500/50 hover:from-blue-700 hover:to-blue-600 text-white py-4 rounded-xl font-bold text-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-xl  flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer'
            >
                <span className="relative z-10 flex items-center gap-3">
                    <Handshake className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Complete
                </span>
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
        </div>
    )
}

export default BookingSummaryCard;