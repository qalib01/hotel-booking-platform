"use client"

import { useBooking } from "@/src/store/booking.store";
import { Hotel, MapPin, Sparkles, Users } from "lucide-react";
import HotelFormCard from "../cards/hotelFormCard";
import BookingStatCard from "../cards/bookingStatCard";
import HotelListCard from "../cards/hotelListCard";
import BookingSummaryCard from "../cards/bookingSummaryCard";


const HeroSection = () => {
    const { step } = useBooking();

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-hero-image">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-gray-900/50"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                    <div className="text-white space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-fadeInDown">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-semibold">Spend your time in our best experienced hotels</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp stagger-1">
                            Discover Your
                            <span className="block bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                Perfect Stay
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-xl animate-fadeInUp stagger-2">
                            Experience world-class hospitality in stunning destinations. Book your dream vacation with exclusive rates and personalized service.
                        </p>

                        <div className="flex flex-wrap gap-8 pt-4 animate-fadeInUp stagger-3">
                            <BookingStatCard
                                title="Premium Hotels"
                                stat="5+"
                                icon={Hotel}
                            />

                            <BookingStatCard
                                title="Destinations"
                                stat="3+"
                                icon={MapPin}
                            />

                            <BookingStatCard
                                title="Happy Guests"
                                stat="10+"
                                icon={Users}
                            />
                        </div>
                    </div>

                    <div className="animate-scaleIn stagger-4">
                        {step === 1 ? (
                            <HotelFormCard />
                        ) : step === 2 ? (
                            <HotelListCard />
                        ) : step === 3 ? (
                            <BookingSummaryCard />
                        ) : (
                            <p>Basla</p>
                        )}
                        
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HeroSection;