import { CafeDAL } from "../dal/index.js"
import { doFileFormat, doPublicURL } from "../lib/format.js";

class CafeService {
    static async getCafeById(cafeId: string) {
        const cafe = await CafeDAL.getCafeById(cafeId);

        const cafeName = doFileFormat(cafe.name);
        cafe.dishes.forEach(dish => {
            dish.img = doPublicURL('assets', 'images', cafeName, 'dishes', doFileFormat(dish.name), 'images', dish.img)
        })
        cafe.logo = doPublicURL('assets', 'images', cafeName, cafe.logo)

        return cafe
    }
}

export {CafeService}