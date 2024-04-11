import { Router } from "express";
import { APIError } from "../errors/APIError.js";

const errorRouter = Router();

errorRouter.all('/', _ => {
    throw APIError.NotFound()
})


export {errorRouter}