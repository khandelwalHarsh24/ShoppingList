import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  singleRecipe: Recipe;
  id:number;
  ingredients:Ingredient[];

  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.singleRecipe=this.recipeService.getRecipe(this.id);
        console.log(this.singleRecipe);
        console.log(this.singleRecipe.imagePath);
        console.log(this.singleRecipe.description);
        console.log(this.singleRecipe.ingredient);
      }
    )
  }

  // also able to directly add to shoppingList

  addToShoppingList(){
      this.recipeService.addIngreToShoppingList(this.singleRecipe.ingredient); 
  }

  editRecipe(){
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
