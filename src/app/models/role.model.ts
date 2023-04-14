export class Role {
    count: number;
    next: string | null;
    previous: string | null;
    results: RoleResults[];
}

export class RoleResults {
    id: number;
    name: string;
}