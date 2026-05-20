import type { Request, Response } from "express";
import * as shipmentService from "../services/shipmentService.js";

export const createShipment = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id as string;
        const { recipientName, recipientAddress, details, senderName, senderAddress } = req.body;
        
        // Additional validation
        if (!recipientName || !recipientAddress) {
            return res.status(400).json({ error: 'Recipient name and address are required' });
        }
        
        const shipment = await shipmentService.createShipment(userId, {
            recipientName,
            recipientAddress,
            details,
            senderName,
            senderAddress,
        });
        res.status(201).json({ shipment });
    } catch (error: any) {
        const message = error?.message || 'Failed to create shipment';
        if (message.includes('not found') || message.includes('not found')) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};

export const getMyShipments = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user as { id: string; isAdmin?: boolean };
        const shipments = user?.isAdmin
            ? await shipmentService.getAllShipments()
            : await shipmentService.getShipmentsByUser(user.id);
        res.json({ shipments });
    } catch (error: any) {
        res.status(500).json({ error: error?.message || 'Failed to fetch shipments' });
    }
};

export const trackByNumber = async (req: Request, res: Response) => {
    try {
        const trackingNumberRaw = req.params.trackingNumber;
        if (!trackingNumberRaw || Array.isArray(trackingNumberRaw)) {
            return res.status(400).json({ error: "Tracking number is required" });
        }
        const trackingNumber: string = trackingNumberRaw.trim();
        
        if (trackingNumber.length < 3) {
            return res.status(400).json({ error: "Tracking number must be valid" });
        }
        
        const shipment = await shipmentService.getByTrackingNumber(trackingNumber);
        if (!shipment) return res.status(404).json({ error: "Shipment not found" });
        res.json({ shipment });
    } catch (error: any) {
        const message = error?.message || 'Failed to track shipment';
        return res.status(500).json({ error: message });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const idRaw = req.params.id;
        if (!idRaw || Array.isArray(idRaw)) return res.status(400).json({ error: "Invalid shipment ID" });
        const id: string = idRaw;
        const { status } = req.body;
        
        // Validate status
        if (!status) {
            return res.status(400).json({ error: "Status is required" });
        }
        
        const validStatuses = ["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        }
        
        const shipment = await shipmentService.updateStatus(id, status);
        res.json({ shipment });
    } catch (error: any) {
        const message = error?.message || 'Failed to update shipment status';
        if (message.includes('not found')) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};
