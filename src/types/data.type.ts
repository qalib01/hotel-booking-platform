export interface Country {
    id: number;
    name: string;
    label: string;
};

export interface Hotel {
    id: number;
    name: string;
    price: number;
};

export interface BoardType {
    code: string;
    name: string;
};

export interface Meal {
    id: number;
    name: string;
    price: number;
}

export interface MealType {
    dinner: Meal[];
    lunch: Meal[];
}