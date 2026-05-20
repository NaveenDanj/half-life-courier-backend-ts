import type { Request, Response } from "express";
export declare const createShipment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyShipments: (req: Request, res: Response) => Promise<void>;
export declare const trackByNumber: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=shipmentController.d.ts.map