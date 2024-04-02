import { FoodType } from "../../calendar/types/PlanType";

export type NameType = {
    id: string;
    name: string;
}
export type menuSampleType = {
    menuMealSamples: menuMealSampleType[]
}
export type menuMealSampleType = {
    from: string;
    to: string;
    mealItemSamples: mealItemSamplesType[];
    name: string;

}
export type mealItemSamplesType = {
    quantity: number;
    food: FoodType;
    order: number;
}

