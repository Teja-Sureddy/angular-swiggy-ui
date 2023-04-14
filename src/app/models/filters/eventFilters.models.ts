export class EventFilter {
    filters: UserFilters | RestaurantFilters | MenuFilters | OrderFilters | OrderedItemsFilters
    first: number;
    globalFilter: number | null;
    multiSortMeta: number | undefined;
    rows: number;
    sortField: string | undefined;
    sortOrder: number;
}

class UserFilters {
    email: Array<MatchMode>;
    role__name: Array<MatchMode>;
    username: Array<MatchMode>;
}

class RestaurantFilters {
    email: Array<MatchMode>;
    user__username: Array<MatchMode>;
}

class MenuFilters {
    name: Array<MatchMode>;
    price: Array<MatchMode>;
    type: Array<MatchMode>;
}

class OrderFilters {
    id: Array<MatchMode>;
    user__username: Array<MatchMode>;
    restaurant__name: Array<MatchMode>;
    dateTime: Array<MatchMode>;
}

class OrderedItemsFilters {
    item__name: Array<MatchMode>;
    item__price: Array<MatchMode>;
    quantity: Array<MatchMode>;
    item__type: Array<MatchMode>;
}

export class MatchMode {
    value: string | null | boolean;
    matchMode: string;
    operator: string;
}