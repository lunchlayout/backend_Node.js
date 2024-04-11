import { NextFunction, Request, Response } from "express";
import { APIError } from "../errors/APIError.js";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const errDTO = {
        message: err.message
    }
    if (err instanceof APIError) {
        return res.status(err.status).json({...errDTO, errors: err.errors})
    } else {
        return res.status(500).json({...errDTO, errors: []})
    }
}

export { errorHandler }