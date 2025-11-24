export interface ICountry {
    id: number;
    name: string;
    label: string;
};

export interface IHotel {
    id: number;
    name: string;
    price: number;
};

export interface IBoardType {
    code: string;
    name: string;
    description?: string;
};

export interface IMeal {
    id: number;
    name: string;
    price: number;
}

export interface IMealType {
    [key: string]: IMeal[];
}