import { FoodType, MenuType } from "../../calendar/types/PlanType";

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

export type BirdType = {
    id: string,
    code: string,
    name: string,
    dayOfBirth: Date,
    gender: string,
    characteristic: string,
    thumbnailUrl: string,
    cage: {
        id: string,
    }
    careMode?: {
        id: string,
        proirity: string,
        name: string,
        createAt: string,
    },
    species?: {
        id: string,
        thumbnailUrl: string,
        name: string,
        createAt: string,
    },
    category?: {
        thumbnailUrl: string,
        name: string,
    },
    createAt: string,
    recommend:boolean,
    menuId: string,
    menu: MenuType

}