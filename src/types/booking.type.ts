export interface IBookingConfigs {
    citizenship?: number;
    destination?: number;
    hotel?: number;
    checkIn?: string;
    checkOut?: string;
    numDays?: number;
    boardType?: string;
}

export interface IMealDay {
    lunch: number | null;
    dinner: number | null;
}

export type MealData = Record<string, IMealDay>;