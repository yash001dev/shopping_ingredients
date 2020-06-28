import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipesChanged=new Subject<Recipe[]>();
  // recipeSelected = new Subject<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2014/10/22/16/38/ingredients-498199_960_720.jpg",
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries',20),
      ],
    ),
    new Recipe(
      "Another Test Recipe",
      "This is simply a test",
      "https://cdn.pixabay.com/photo/2015/09/05/01/05/french-fries-923687_960_720.jpg",
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1),
      ],
    ),
  ];
  constructor(private slService:ShoppingListService){};
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  }


  addIngredientToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
