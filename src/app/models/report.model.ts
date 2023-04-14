export class Report {
    restaurant: string;
    user_spending: UserSpending[];
}

export class UserSpending {
    order__user__username: string;
    total_spending: number
}