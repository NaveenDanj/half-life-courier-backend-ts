export declare const createShipment: (userId: string, payload: any) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingNumber: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    details: string;
    status: import("@prisma/client").$Enums.ShipmentStatus;
    userId: string;
}>;
export declare const getShipmentsByUser: (userId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingNumber: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    details: string;
    status: import("@prisma/client").$Enums.ShipmentStatus;
    userId: string;
}[]>;
export declare const getAllShipments: () => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingNumber: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    details: string;
    status: import("@prisma/client").$Enums.ShipmentStatus;
    userId: string;
}[]>;
export declare const getByTrackingNumber: (trackingNumber: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingNumber: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    details: string;
    status: import("@prisma/client").$Enums.ShipmentStatus;
    userId: string;
} | null>;
export declare const updateStatus: (id: string, status: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    trackingNumber: string;
    senderName: string;
    senderAddress: string;
    recipientName: string;
    recipientAddress: string;
    details: string;
    status: import("@prisma/client").$Enums.ShipmentStatus;
    userId: string;
}>;
//# sourceMappingURL=shipmentService.d.ts.map