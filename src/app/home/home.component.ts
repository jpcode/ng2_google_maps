import { Component, OnInit } from '@angular/core';
import 'js-marker-clusterer/src/markerclusterer.js';

@Component({
  selector: 'vec-home',
  templateUrl: './home.template.html',
  styleUrls: [ './home.style.css' ]
})


export class Home implements OnInit{
  titleHome: 'Angular 2 Seed - Basic Example'
  
  

  constructor() { }

  
   ngOnInit() : void {
    
  }

 

}
