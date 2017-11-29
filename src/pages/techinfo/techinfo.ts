import { Component } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-techinfo',
  templateUrl: 'techinfo.html'
})
export class TechinfoPage {
	
	private data: {index: number, name: string, img: string, detail: string};
	
	constructor(public navCtrl: NavController, private events: Events, public navParams: NavParams) {
		this.events.publish("deactivate");
		this.data = this.navParams.get("tech");
  	}
}
