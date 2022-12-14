import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    
    recipeChanged=new Subject<Recipe[]>();


    constructor(private shoppingService:ShoppingService){}

    private recipes:Recipe[]=[
        new Recipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
              new Ingredient('Meat', 1),
              new Ingredient('French Fries', 20)
            ]),
          new Recipe('Big Fat Burger',
            'What else you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
              new Ingredient('Buns', 2),
              new Ingredient('Meat', 1)
            ])
    ];  // arrays of recipes 


    // return a copy of above array
    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(id:number){
      return this.recipes[id];
    }

    

    // to add to current ingredient
    
    addIngreToShoppingList(ingredient:Ingredient[]){
      this.shoppingService.addIngreToShopping(ingredient);    
    }

    addRecipe(newRecipe:Recipe){
      this.recipes.push(newRecipe);
      this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,updaterecipe:Recipe){
      this.recipes[index]=updaterecipe;
      this.recipeChanged.next(this.recipes.slice());
    }
    

    deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipeChanged.next(this.recipes.slice());
    }

}