import { Component, OnInit,ViewChild ,Inject } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  commentForm:FormGroup;
  comment:Comment;
 dish:Dish;
 dishIds:string[];
 prev:string;
 next:string;
  Date = new Date("2017-04-13");
  DateToString = this.Date.toISOString();
 @ViewChild ('fform') feedbackFormDirective;
 formErrors=
{
  'author': '',
  'comment': ''
};

validationMessages=
{
'author': {
'required': 'author name is required.',
'minlength': 'author  must be at least 2 charcters long'
},
'comment': {
'required': 'comment is required.'
},
};

  constructor(private dishService:DishService,private rout:ActivatedRoute,
    private location:Location,private fb:FormBuilder,@Inject('BaseURL') private BaseURL) 
  {

    
   }
  ngOnInit() 
  {
    this.creatForm();
    this.dishService.getDishIds().subscribe((dishIds)=>this.dishIds=dishIds);
    this.rout.params.pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
    .subscribe(dish=>{this.dish=dish;this.setPrevNext(dish.id);});
  
  }

  creatForm(): void
  {
    this.commentForm=this.fb.group({
      author:['',[Validators.required, Validators.minLength(2)] ],
      comment:['',[Validators.required] ],
      rating:5
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any)
  {
    if(!this.commentForm)
    {
      return;
    }
    const form=this.commentForm;
    for(const field in this.formErrors)
    {
      if(this.formErrors.hasOwnProperty(field))
      {
        //clear previos error message(if any)
        this.formErrors[field] = '';
        const control=form.get(field);
        if(control && control.dirty && !control.value)
        {
          const messages=this.validationMessages[field];
          for(const key in control.errors)
          {
            if(control.errors.hasOwnProperty(key))
            {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    DISHES[this.dish.id].comments.push({
      "rating" :this.commentForm.value.rating,
      "comment" :this.commentForm.value.comment,
      "author" :this.commentForm.value.author,
      "date" :this.DateToString
    })
    this.feedbackFormDirective.resetForm();
  }


  setPrevNext(dishId:string)
  {
    const index=this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack():void
  {
    this.location.back();
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

}
