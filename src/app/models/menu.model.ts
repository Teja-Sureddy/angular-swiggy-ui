export class Menu {
    count: number;
    next: string | null;
    previous: string | null;
    results: MenuResults[];
}

export class MenuResults {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    type: boolean;
    restaurant: number;
}

export class Cart {
    id: number;
    image: string;
    name: string;
    price: number;
    description: string;
    type: boolean;
    restaurant: number;
    quantity: number;
}