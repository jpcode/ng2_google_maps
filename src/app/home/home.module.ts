import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { Home } from './home.component';

import { FormsModule }   from '@angular/forms';


import { HttpModule }    from '@angular/http';

import { SiteMap } from './sitemap/site-map.component';

export const routes = [
  { path: '', component: Home, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpModule
  ],
  declarations: [ Home, SiteMap ]
})

export default class HomeModule {
  static routes = routes;

}
