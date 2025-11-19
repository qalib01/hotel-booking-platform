"use client"

import { useState } from "react"
import { Calendar, MapPin, Hotel, Users } from "lucide-react"
import Input from "../ui/input"

export const HeroSection = () => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [country, setCountry] = useState("")
    const [hotel, setHotel] = useState("")
    const [guests, setGuests] = useState("1")

    return (
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">

            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src="/hero.jpg"
                    alt="hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl animate-fade-in-up">
                    Discover Your Perfect Stay
                </h1>
                <p className="mt-4 text-lg md:text-xl opacity-90 animate-fade-in-up delay-200">
                    Choose from top destinations, premium hotels and flexible travel dates.
                </p>

                {/* Booking Form */}
                <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 rounded-2xl
                                max-w-4xl mx-auto animate-fade-in-up delay-300">

                    <form className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left">

                        {/* Destination Country */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Destination</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-white/40 focus:outline-none"
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Hotel */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Hotel</label>
                            <div className="relative">
                                <Hotel className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Hotel name"
                                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-white/40 focus:outline-none"
                                    value={hotel}
                                    onChange={e => setHotel(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Start Date */}
                        {/* <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Start</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                                <input
                                    type="date"
                                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>
                        </div> */}
                        <Input
                            type='date'
                            className='border-white/20 focus:border-white/40 focus:outline-none'

                        />

                        {/* End Date */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">End</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                                <input
                                    type="date"
                                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col">
                            <label className="text-sm font-medium mb-1">Guests</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-300" />
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white border border-white/20 focus:border-white/40 focus:outline-none"
                                    value={guests}
                                    onChange={e => setGuests(e.target.value)}
                                />
                            </div>
                        </div>

                    </form>

                    <button
                        className="mt-5 w-full md:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold 
                                    text-white shadow-lg hover:scale-105 transition-all"
                    >
                        Search
                    </button>
                </div>

            </div>
        </section>
    )
}
