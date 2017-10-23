import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { MoviePage } from '../movie/movie';
import { NewbookPage } from '../newbook/newbook';
import { BookPage } from '../book/book';
import { SoftwarePage } from '../software/software';
import { TechnologyPage } from '../technology/technology';
import { ExhibitionPage } from '../exhibition/exhibition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
  	constructor(public navCtrl: NavController, private events: Events){
		this.events.publish("activate");
  	}
	
	goPage(page){
		switch(page){
			case "movie":{ this.navCtrl.setRoot(MoviePage); break; }
			case "newbook":{ this.navCtrl.setRoot(NewbookPage); break; }
			case "book":{ this.navCtrl.setRoot(BookPage); break; }
			case "software":{ this.navCtrl.setRoot(SoftwarePage); break; }
			case "technology":{ this.navCtrl.setRoot(TechnologyPage); break; }
			case "exhibition":{ this.navCtrl.setRoot(ExhibitionPage); break; }
		}
	}

}
