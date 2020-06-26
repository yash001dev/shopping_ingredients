import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];
  private idChangedSub:Subscription;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.slService.getIngredients();
    this.idChangedSub=
    this.slService.ingredientChanged
    .subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );
  }

  onEditItem(index:number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy():void{
    this.idChangedSub.unsubscribe();
  }
}
