import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut ,expand} from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host:{
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations:[
    expand(),
    flyInOut()
    
  ]
})
export class AboutComponent implements OnInit {
  leader:Leader[];
  constructor(private leaderService:LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leader=> this.leader=leader);
  }

}
