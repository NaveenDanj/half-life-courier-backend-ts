export declare const register: ({ email, password, name, address }: any) => Promise<{
    id: string;
    email: string;
    name: string | null;
    address: string | null;
}>;
export declare const login: ({ email, password }: any) => Promise<string>;
export declare const getMe: (userId: string) => Promise<{
    email: string;
    name: string | null;
    address: string | null;
    id: string;
    isAdmin: boolean;
}>;
//# sourceMappingURL=authService.d.ts.map