"use client"

import { countries, hotels } from "@/src/data/data";
import { IHotel } from "@/src/types/data.type";
import { Calendar, Hotel, MapPin, Search, Sparkles, Users } from "lucide-react";
import { useState } from "react";


export const HeroSection = () => {
    const [formData, setFormData] = useState<{
        destination: string,
        hotel: string,
        checkIn: string;
        checkOut: string;
        guests: number;
    }>({
        destination: '',
        hotel: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Booking search:', formData);
    };

    const availableHotels: IHotel[] = formData.destination ? hotels[formData.destination] : [];

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 bg-hero-image">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-gray-900/40"></div>
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
                            <span className="block bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">
                                Perfect Stay
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-xl animate-fadeInUp stagger-2">
                            Experience world-class hospitality in stunning destinations. Book your dream vacation with exclusive rates and personalized service.
                        </p>

                        <div className="flex flex-wrap gap-8 pt-4 animate-fadeInUp stagger-3">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <Hotel className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">5+</div>
                                    <div className="text-white text-sm">Premium Hotels</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">3+</div>
                                    <div className="text-white text-sm">Destinations</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <Users className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">10+</div>
                                    <div className="text-white text-sm">Happy Guests</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-scaleIn stagger-4">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-500">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Hotel</h2>
                                <p className="text-gray-600">Search the best special deals for you</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative group">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                        Destination
                                    </label>
                                    <select
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value, hotel: '' })}
                                        className="w-full px-4 outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                                        required
                                    >
                                        <option value="">Select destination</option>
                                        {countries.map(c => (
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {formData.destination && (
                                    <div className="relative group animate-fadeInUp">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Hotel className="w-4 h-4 text-blue-600" />
                                            Hotel
                                        </label>
                                        <select
                                            value={formData.hotel}
                                            onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                            className="w-full px-4 outline-none py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-blue-300"
                                            required
                                        >
                                            <option value="">Select hotel</option>
                                            {availableHotels.map(hotel => (
                                                <option key={hotel.id} value={hotel.id}>
                                                    {hotel.name} - ${hotel.price}/night
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 text-blue-600" />
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.checkIn}
                                            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
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
                                            value={formData.checkOut}
                                            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                            min={formData.checkIn}
                                            className="w-full px-4 py-3.5 outline-none bg-gray-50 cursor-pointer border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium hover:border-blue-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Users className="w-4 h-4 text-blue-600" />
                                        Guests
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3.5 outline-none bg-gray-50 cursor-pointer border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 font-medium hover:border-blue-300"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center gap-3 group relative overflow-hidden cursor-pointer"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        Search Hotels
                                    </span>
                                    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </form>

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
                    </div>

                </div>
            </div>
        </div>
    );
}
