import { Component, OnInit } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
 dish:Dish;
  constructor(private dishService:DishService,private rout:ActivatedRoute,
    private location:Location) 
  {

   }
  ngOnInit() 
  {
    let id =this.rout.snapshot.params['id'];
    this.dish=this.dishService.getDish(id);
  }
  goBack():void
  {
    this.location.back();
  }

}
