import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bookinfo',
  templateUrl: 'bookinfo.html'
})
export class BookInfoPage {
	
	private data: Array<{index: number, name: string, img: string, lineshelf: number, detail: string}>;
	
  	constructor(public navCtrl: NavController, private navParams: NavParams) {
		this.data = this.navParams.get("data");
  	}
}
