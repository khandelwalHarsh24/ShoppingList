import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredient:Ingredient[];

    constructor(name:string,descr:string,imagePath:string,ingredient:Ingredient[]){
        this.name=name;
        this.description=descr;
        this.imagePath=imagePath;
        this.ingredient=ingredient;
    }
}