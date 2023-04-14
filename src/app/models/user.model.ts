export class User {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserResults[];
}

export class UserResults {
    id: number;
    username: string;
    email: string;
    role: number;
    roleName: string
}