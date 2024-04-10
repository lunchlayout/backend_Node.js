import { Router } from "express";
import { ReviewController } from '../controllers/index.js'

const reviewRouter = Router();

reviewRouter.route('/')
            .post(ReviewController.sendReview)


export {reviewRouter}