import { EventEmitter } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
export class ShoppingService{
    

    ingredientChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();

    private ingredients:Ingredient[]=[
        new Ingredient('Apples',5),
        new Ingredient('Mango',5) 
    ];

    // to getingredients
    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index]; 
    }

    // to add ingredients
    addIngredient(ingredientData:Ingredient){
        this.ingredients.push(ingredientData);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    // to add ingredients using shoppingList
    addIngreToShopping(newingredient:Ingredient[]){
        this.ingredients.push(...newingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientChanged.next(this.ingredients.slice());
    }

}