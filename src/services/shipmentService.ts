import { prisma } from "../lib/prisma.js";
import { nanoid } from "nanoid";

export const createShipment = async (userId: string, payload: any) => {
    const trackingNumber = nanoid(10).toUpperCase();
    const shipment = await prisma.shipment.create({
        data: {
            trackingNumber,
            senderName: payload.senderName,
            senderAddress: payload.senderAddress,
            recipientName: payload.recipientName,
            recipientAddress: payload.recipientAddress,
            details: payload.details || "",
            userId,
        },
    });
    return shipment;
};

export const getShipmentsByUser = async (userId: string) => {
    return prisma.shipment.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
};

export const getAllShipments = async () => {
    return prisma.shipment.findMany({ orderBy: { createdAt: "desc" } });
};

export const getByTrackingNumber = async (trackingNumber: string) => {
    return prisma.shipment.findUnique({ where: { trackingNumber } });
};

export const updateStatus = async (id: string, status: string) => {
    return prisma.shipment.update({ where: { id }, data: { status } as any });
};
