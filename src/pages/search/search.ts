import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GuidemapPage } from '../guidemap/guidemap';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
	
	word: string;
	type: string;
	order: string;
	
  	constructor(public navCtrl: NavController) {
  	}

	searching(event) {
	}

	clearsearch() {
		this.word = "";
	}
	
	openmap() {
		this.navCtrl.push(GuidemapPage);
	}

}
