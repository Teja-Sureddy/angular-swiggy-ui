export class OrderedItems {
    count: number;
    next: string | null;
    previous: string | null;
    results: OrderedItemsResults[];
}

export class OrderedItemsResults {
    id: number;
    itemName: string;
    itemPrice: number;
    itemType: boolean;
    quantity: number;
    order: number;
    item: number;
}