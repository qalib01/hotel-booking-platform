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
                <div className="absolute inset-0 gradient-overlay"></div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

                    {/* Left Side - Hero Text */}
                    <div className="text-white space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-fadeInDown">
                            <Sparkles className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-semibold">Luxury Hotel Experiences</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp stagger-1">
                            Discover Your
                            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
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
                                    <div className="text-3xl font-bold">500+</div>
                                    <div className="text-purple-200 text-sm">Premium Hotels</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">50+</div>
                                    <div className="text-purple-200 text-sm">Destinations</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                                    <Users className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">1M+</div>
                                    <div className="text-purple-200 text-sm">Happy Guests</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-scaleIn stagger-4">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-500">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Your Hotel</h2>
                                <p className="text-gray-600">Search and compare the best deals</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative group">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 text-purple-600" />
                                        Destination
                                    </label>
                                    <select
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value, hotel: '' })}
                                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-purple-300"
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
                                            <Hotel className="w-4 h-4 text-purple-600" />
                                            Hotel
                                        </label>
                                        <select
                                            value={formData.hotel}
                                            onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium appearance-none cursor-pointer hover:border-purple-300"
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
                                            <Calendar className="w-4 h-4 text-purple-600" />
                                            Check-in
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.checkIn}
                                            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium hover:border-purple-300"
                                            required
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 text-purple-600" />
                                            Check-out
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.checkOut}
                                            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                            min={formData.checkIn}
                                            className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium hover:border-purple-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="relative group">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                        <Users className="w-4 h-4 text-purple-600" />
                                        Guests
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium hover:border-purple-300"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center gap-3 group relative overflow-hidden"
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
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span>Free Cancellation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-white rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
