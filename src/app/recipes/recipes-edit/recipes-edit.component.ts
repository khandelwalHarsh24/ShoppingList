import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id:number;
  isEdit=false;
 
  recipeForm:FormGroup;

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,
    private router:Router) { }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.isEdit=params['id']!=null; 
        this.initForm();
      }
    )
  }


  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }


  onSubmit(){
    if(this.isEdit){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
}

 
addIngredient(){
  (<FormArray>this.recipeForm.get('ingredient')).push(
    new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount': new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[0-9]+[0-9]*$/)
      ])
    })
  )
}

  

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

  private initForm(){
    let recipeName=''
    let recipeImagePath=''
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);

    if(this.isEdit){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredient']){
        for(let ingredient of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[0-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm=new FormGroup({
       'name': new FormControl(recipeName,Validators.required),
       'imagePath': new FormControl(recipeImagePath,Validators.required),
       'description': new FormControl(recipeDescription,Validators.required),
       'ingredient': recipeIngredients
      
    })
  }

}
