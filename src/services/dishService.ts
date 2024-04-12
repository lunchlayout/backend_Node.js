import { DishDAL } from "../dal/index.js"
import { doFileFormat, doPublicURL } from "../lib/format.js";

class DishService {
    static async getDishes(cafeId: string, query: string, page: number) {
        const dishesWithCafe = await DishDAL.getDishes(cafeId, query, page - 1);
        if (dishesWithCafe.dishes.length) {
            const cafeName = doFileFormat(dishesWithCafe.cafeName);
            dishesWithCafe.dishes.forEach(dish => {
                dish.img = doPublicURL('assets', 'images', cafeName, 'dishes', doFileFormat(dish.name), 'images', dish.img)
            })
        }
        return {...dishesWithCafe, cafeName: undefined}
    }
    static async getDishContent(dishId: string) {
        const dish = await DishDAL.getDishContent(dishId);
        const cafeName = doFileFormat(dish.cafeName);
        const dishName = doFileFormat(dish.name);
        dish.facts.forEach(fact => {
            fact.img = doPublicURL('assets', 'images', cafeName, 'dishes', dishName, 'images', fact.img)
        })
        dish.modelSrc = doPublicURL('assets', 'model', cafeName, 'dishes', dishName, 'model', dish.modelSrc)
        return {...dish, cafeName: undefined}
    }
    static async getDishAbout(dishId: string) {
        const dish = await DishDAL.getDishAbout(dishId);
        const cafeName = doFileFormat(dish.cafeName);
        const dishName = doFileFormat(dish.name);
        dish.img = doPublicURL('assets', 'images', cafeName, 'dishes', dishName, 'images', dish.img)
        return {...dish, cafeName: undefined}
    }
}

export {DishService}