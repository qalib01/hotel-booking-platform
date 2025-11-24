"use client"

import { boardTypes, countries, hotels, mealOptions } from "@/src/data/data";
import getDatesBetween from "@/src/helper/getDatesBetween";
import { useBooking } from "@/src/store/booking.store";
import jsPDF from "jspdf";
import { Calendar, Coins, Handshake, HardDriveDownload, Hotel, MapPin, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import ActionButton from "../ui/button";


const BookingSummaryCard = () => {
    const { bookingData, mealData } = useBooking();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    const totalStay = getDatesBetween(bookingData?.checkIn || '', bookingData?.checkOut || '').length - 1;
    const selectedCitizenship = countries.find(country => country.id === bookingData?.citizenship);
    const selectedDestination = countries.find(country => country.id === bookingData?.destination);
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

    const handleComplete = async () => {
        setIsLoading(true);

        const finalBookingData = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            customer: {
                citizenship: selectedCitizenship?.name,
                destination: selectedDestination?.name,
            },
            stayDetails: {
                hotel: selectedHotel?.name,
                boardType: selectedBoardType?.name,
                checkIn: bookingData?.checkIn,
                checkOut: bookingData?.checkOut,
                totalNights: totalStay,
            },
            meals: mealData,
            financial: {
                totalPrice: totalPrice,
                currency: "$"
            }
        };

        try {
            const response = await fetch('/api/create-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalBookingData),
            });

            if (response.ok) {
                alert('Rezervasiya uğurla tamamlandı!');
                setIsUploaded(true);
            } else {
                alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server xətası.');
        } finally {
            setIsLoading(false);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(40);
        doc.setTextColor(0, 0, 60);
        doc.text("HBS - Enjoy your stay", 20, 20);

        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text("Booking Confirmation", 20, 30);

        doc.setFontSize(10);
        doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);
        doc.text(`Booking ID: ${Date.now()}`, 20, 45);

        doc.line(20, 50, 190, 50);

        doc.setFontSize(14);
        doc.text("Customer Information", 20, 60);
        doc.setFontSize(12);
        doc.text(`Citizenship: ${selectedCitizenship?.name}`, 20, 70);
        doc.text(`Destination: ${selectedDestination?.name}`, 20, 80);

        doc.setFontSize(14);
        doc.text("Stay Details", 20, 100);
        doc.setFontSize(12);
        doc.text(`Hotel: ${selectedHotel?.name}`, 20, 110);
        doc.text(`Board Type: ${selectedBoardType?.name}`, 20, 120);
        doc.text(`Check-in: ${bookingData?.checkIn}`, 20, 130);
        doc.text(`Check-out: ${bookingData?.checkOut}`, 20, 140);
        doc.text(`Total Nights: ${totalStay}`, 20, 150);

        doc.setFontSize(14);
        doc.text("Meal Selection", 20, 170);
        doc.setFontSize(10);

        let yPos = 175;

        if (Object.entries(mealData).length > 0) {
            Object.entries(mealData).map(([date, meals]) => {
                const text = `
                    ${date}: Lunch (${selectedMealOption.lunch.find(l => l.id === meals.lunch)?.name || 'Not selected' || '-'}), Dinner (${selectedMealOption.dinner.find(l => l.id === meals.dinner)?.name || 'Not selected' || '-'})
                `;
                doc.text(text, 10, yPos);
                yPos += 7;
            });
        } else {
            doc.text("No meals selected", 20, yPos);
            yPos += 10;
        }

        yPos += 10;
        doc.line(20, yPos, 200, yPos);
        yPos += 10;
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 255);
        doc.text(`Total Price: $${totalPrice}`, 20, yPos + 10);

        doc.save(`booking-${Date.now()}.pdf`);
    };

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
                    <p className="text-lg font-semibold text-gray-700"> {selectedCitizenship?.name} </p>
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

            <div className="w-full flex gap-2 mt-4">
                <ActionButton
                    label="Download"
                    onClick={generatePDF}
                    type="button"
                    icon={HardDriveDownload}
                    baseColor="gray"
                    disabled={isLoading}
                    isConditional={!isUploaded}
                />
                <ActionButton
                    label="Complete"
                    onClick={handleComplete}
                    type="button"
                    icon={Handshake}
                    baseColor="blue"
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default BookingSummaryCard;