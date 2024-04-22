import { CafeDAL } from "../dal/index.js"
import { doPathToImage } from "../lib/format.js";

class CafeService {
    static async getCafeById(cafeId: string) {
        const cafe = await CafeDAL.getCafeById(cafeId);
        cafe.logo = doPathToImage(cafe.logo)
        return cafe
    }
}

export {CafeService}