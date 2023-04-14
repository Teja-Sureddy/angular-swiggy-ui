export class Restaurant {
    count: number;
    next: string | null;
    previous: string | null;
    results: RestaurantResults[];
}

export class RestaurantResults {
    id: number;
    username: string;
    user: number;
    image: string;
    name: string
}