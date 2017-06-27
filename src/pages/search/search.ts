import { Component } from '@angular/core';
 
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
