import { Response } from "express";
import { IGetCafeReq } from "../types/request";
import { CafeService } from "../services/index.js";

class CafeController {
    static async getCafeById(req: IGetCafeReq, res: Response) {
        try {
            const {cafeId} = req.params;
            const cafe = await CafeService.getCafeById(cafeId);
            return res.status(200).json(cafe);  
        } catch (error) {
            
        }
    }
}

export {CafeController}