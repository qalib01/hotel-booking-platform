"use client"

import { countries } from "@/src/data/data";
import { mainMenuItems } from "@/src/data/map";
import { ChevronRight, Hotel, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";


export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl flex items-center justify-center shadow-lg">
                                <Hotel className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">HBS</h3>
                                <p className="text-sm text-white-100">Enjoy Your Stay</p>
                            </div>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                            Experience luxury and comfort with our premium hotel booking service. Your perfect stay is just a click away.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-white rounded-full"></div>
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {mainMenuItems.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-white rounded-full"></div>
                            Top Destinations
                        </h3>
                        <ul className="space-y-3">
                            {countries.map((country, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={`/destinations/${country.label}`}
                                        className="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        {country.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-white rounded-full"></div>
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-200">
                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-white-400" />
                                <span>123 Hotel Street, Luxury District, City 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors">
                                <Phone className="w-5 h-5 flex-shrink-0 text-white-400" />
                                <a href="tel:+1234567890">+1 (234) 567-890</a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors">
                                <Mail className="w-5 h-5 flex-shrink-0 text-white-400" />
                                <a href="mailto:info@hbs.com">info@hbs.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-200 text-sm text-center md:text-left">
                            © {currentYear} HBS - Hotel Booking System. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#privacy" className="text-gray-200 hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-gray-200 hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <a href="#cookies" className="text-gray-200 hover:text-white transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};