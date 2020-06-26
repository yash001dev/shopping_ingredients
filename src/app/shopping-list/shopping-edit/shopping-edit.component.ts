import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.slService.startedEditing
    .subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.slService.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onAddItem(form:NgForm) {
    const value=form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient)
    }else{
    this.slService.addIngredient(newIngredient);
    }
    // console.log(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
  }

}
