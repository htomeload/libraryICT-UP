import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';

import { LandadderPage } from "../landadder/landadder";

@Component({
  selector: 'page-locadd',
  templateUrl: 'locadd.html'
})
export class LocaddPage {
	
	private v: {beacon: any, meter: number, baseloc: string, choicer: boolean};
	private nameplace: string;
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, private navParams: NavParams){
		this.events.publish("deactivate");
		
		let beacon = this.navParams.get("beacon");
		let meter = this.navParams.get("meter");
		let baseloc = this.navParams.get("baseloc");
		let choicer = this.navParams.get("choicer");
		
		this.v = {beacon: beacon, meter: meter, baseloc: baseloc, choicer: choicer};
		this.nameplace = "";
  	}
	
	ionViewWillLeave(){
		
	}

	chosenIt(){
		const alert = this.alertCtrl.create({
			title: "ยืนยันชื่อโซนพื้นที่ ?",
			message: this.nameplace,
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						this.navCtrl.push(LandadderPage, {beacon: this.v.beacon, meter: this.v.meter, baseloc: this.v.baseloc, choicer: this.v.choicer, loc: this.nameplace});
					}
				},
				{
					text: "ยกเลิก",
					handler: () => {
					}
				}
			]
		});
		alert.present();
	}

}
