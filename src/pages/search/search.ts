import { Component } from '@angular/core';
 
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
 
@Component({
  templateUrl: 'search.html'
})
export class SearchPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
 
  constructor() {
 
  }

	searchNow(data){
		console.log(data);
	}
}
