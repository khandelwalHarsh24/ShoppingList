import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients:Ingredient[];
  private igChanged:Subscription;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.getIngredients(); 
    this.igChanged=this.shoppingService.ingredientChanged.subscribe((changedData:Ingredient[])=>{
      this.ingredients=changedData;
    })
  }

  ngOnDestroy(): void {
    this.igChanged.unsubscribe();
  }

  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }

}
