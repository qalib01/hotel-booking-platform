"use client"

import { mainMenuItems } from "@/src/data/map";
import { ChevronRight, Globe, Hotel, Mail, Menu, Phone, User, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";


export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className='bg-gradient-to-r from-gray-900 to-blue-900 text-white'>
            <div className="py-2 animate-fadeIn">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-6">
                            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
                                <Phone className="w-4 h-4" />
                                <span className="hidden sm:inline">+1 (234) 567-890</span>
                            </a>
                            <a href="mailto:info@hbs.com" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
                                <Mail className="w-4 h-4" />
                                <span className="hidden sm:inline">info@hbs.com</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 hover:text-gray-200 transition-colors cursor-pointer">
                                <Globe className="w-4 h-4" />
                                <span className="hidden sm:inline">EN</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                    >
                        <div className='w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg bg-gradient-to-br from-gray-900 to-blue-900sa'>
                            <Hotel className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className='text-lg font-medium transition-colors text-white'>
                                HBS
                            </span>
                            <div className='text-xs font-medium transition-colors text-white'>
                                Enjoy Your Stay
                            </div>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {mainMenuItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className='px-4 py-2 font-semibold transition-all duration-300 rounded-lg relative group text-white hover:text-blue-900'
                            >
                                <span className="relative z-10">{item.name}</span>
                                <div className='absolute inset-0 bg-purple-50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100'></div>
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/book"
                            className="flex items-center hidden lg:flex items-center gap-1 justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-200 text-blue-900 shadow-lg font-bold hover:from-gray-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span>Book</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='lg:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100'
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" color="white" /> : <Menu className="w-6 h-6" color="white" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200 animate-slideDown">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                        {mainMenuItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg font-semibold transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <Link
                            href="/book"
                            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-200 text-blue-900 shadow-lg font-bold hover:from-gray-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span>Book</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};