export class Order {
    count: number;
    next: string | null;
    previous: string | null;
    results: OrderResults[];
}

export class OrderResults {
    id: number;
    user: number;
    userName: string;
    restaurantName: string;
    dateTime: string;
    restaurant: number;
    total_price: number;
}