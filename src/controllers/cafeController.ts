import { NextFunction, Response } from "express";
import { IGetCafeReq } from "../types/request";
import { CafeService } from "../services/index.js";
import { isValidObjectId } from "mongoose";
import { APIError } from "../errors/APIError.js";

class CafeController {
    static async getCafeById(req: IGetCafeReq, res: Response, next: NextFunction) {
        try {
            const {cafeId} = req.params;
            if (!isValidObjectId(cafeId)) throw APIError.NotFound();

            const cafe = await CafeService.getCafeById(cafeId);
            return res.status(200).json(cafe);  
        } catch (error) {
            next(error)
        }
    }
}

export {CafeController}