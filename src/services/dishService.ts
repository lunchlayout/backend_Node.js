import { DishDAL } from "../dal/index.js"
import { doFileFormat, doPublicURL } from "../lib/format.js";

class DishService {
    static async getDishById(dishId: string) {
        const dish = await DishDAL.getDishById(dishId);
        const cafeName = doFileFormat(dish.cafeName);
        const dishName = doFileFormat(dish.name);
        dish.content.facts.forEach(fact => {
            fact.img = doPublicURL('assets', 'images', cafeName, 'dishes', dishName, 'images', fact.img)
        })
        dish.content.modelSrc = doPublicURL('assets', 'model', cafeName, 'dishes', dishName, 'model', dish.content.modelSrc)
        return {...dish, cafeName: undefined}
    }
}

export {DishService}