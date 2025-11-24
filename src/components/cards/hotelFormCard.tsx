"use client"

import { boardTypes, countries } from "@/src/data/data";
import { useBooking } from "@/src/store/booking.store";
import { Calendar, ChevronRight, MapPin, Sparkles, Users } from "lucide-react";
import ActionButton from "../ui/button";
import Select from "../ui/select";
import Input from "../ui/input";
import Radio from "../ui/radio";
import getCheckDateLimits from "@/src/helper/getCheckDateLimits";


const HotelFormCard = () => {
    const { bookingData, setBookingData, setStep } = useBooking();
    const isContinueBtnDisabled = !bookingData?.citizenship || !bookingData.checkIn || !bookingData.checkOut || !bookingData.destination || !bookingData.boardType;
    const today = new Date().toISOString().split('T')[0];

    const { minCheckoutDate, maxCheckoutDate } = getCheckDateLimits(bookingData?.checkIn);

    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-500">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Hotel</h2>
                <p className="text-gray-600">Search the best special deals for you</p>
            </div>

            <div className="space-y-6">
                <Select
                    icon={Users}
                    title="Citizenship"
                    value={bookingData?.citizenship}
                    onChange={(e) => setBookingData({ ...bookingData, citizenship: Number(e.target.value) })}
                    options={countries}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        icon={Calendar}
                        label="Check-in"
                        type="date"
                        value={bookingData?.checkIn}
                        onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                        min={today}
                    />

                    <Input
                        icon={Calendar}
                        label="Check-out"
                        type="date"
                        value={bookingData?.checkOut}
                        isDisabled={!bookingData?.checkIn}
                        onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                        min={minCheckoutDate}
                        max={maxCheckoutDate}
                    />
                </div>

                <Select
                    icon={MapPin}
                    title="Destination"
                    value={bookingData?.destination}
                    onChange={(e) => setBookingData({ ...bookingData, destination: Number(e.target.value) })}
                    options={countries}
                />

                {
                    !!bookingData?.destination && (
                        <div className="relative group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                Board type
                            </label>
                            <div className="grid grid-cols-1 gap-3">
                                {boardTypes.map(type => (
                                    <Radio
                                        name="boardType"
                                        value={type.code}
                                        isChecked={bookingData.boardType === type.code}
                                        onChange={(e) => setBookingData({ ...bookingData, boardType: e.target.value })}
                                        title={type.name}
                                        description={type.description}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }

                <ActionButton
                    label="Continue to Meal Selection"
                    onClick={() => setStep(2)}
                    type="button"
                    icon={ChevronRight}
                    baseColor="blue"
                    disabled={isContinueBtnDisabled}
                />
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