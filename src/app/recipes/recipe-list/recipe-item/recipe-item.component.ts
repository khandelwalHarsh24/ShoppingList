import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() actualRecipe:Recipe;  // To get the data from recipe list 
  @Input() index:number;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

  

  

}
