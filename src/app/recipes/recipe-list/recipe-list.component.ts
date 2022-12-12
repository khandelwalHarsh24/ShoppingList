import { Component,  OnDestroy,  OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{


  // <====  Arrays of recipes ====>
  recipes:Recipe[];
  subscription:Subscription;
  

  
  constructor(private recipeService:RecipeService,
    private route:Router,
    private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription=this.recipeService.recipeChanged.subscribe(
      (recipe:Recipe[])=>{
        this.recipes=recipe;
      }
    )
    this.recipes=this.recipeService.getRecipes();  // access recipes from recipeService
  }

  onNewRecipe(){
    this.route.navigate(['new'],{relativeTo:this.router})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

}
