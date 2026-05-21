export declare const updateUserRole: (userId: string, isAdmin: boolean) => Promise<{
    email: string;
    name: string | null;
    address: string | null;
    id: string;
    isAdmin: boolean;
}>;
export declare const getAllUsers: () => Promise<{
    email: string;
    name: string | null;
    address: string | null;
    id: string;
    isAdmin: boolean;
    createdAt: Date;
}[]>;
export declare const getUserById: (userId: string) => Promise<{
    email: string;
    name: string | null;
    address: string | null;
    id: string;
    isAdmin: boolean;
}>;
//# sourceMappingURL=userService.d.ts.map