import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  
})
export class RecipesComponent implements OnInit {

  selectedRecipes:Recipe;  
  // store a single recipe  that was selected

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
   
  }

  

}
