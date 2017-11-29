import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { YourrewardPage } from '../yourreward/yourreward';

@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html'
})
export class RewardPage {

	private ownername: string;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
		let i = localStorage.getItem("indexer");

		if (i === "" || i === "NaN"){
			localStorage.setItem("indexer", "0");
		}
	}

	savereward(){
		let i = parseInt(localStorage.getItem("indexer"));
		i++;

		localStorage.setItem("reward_"+String(i), this.ownername);
		localStorage.setItem("indexer", String(i));

		let alert = this.alertCtrl.create({
			title: "ระบบ",
			message: "ดำเนินการบันทึกแล้ว",
			buttons: [{
				text: "รับทราบ",
				handler: () => {
					this.ownername = "";
					this.navCtrl.push(YourrewardPage);
				}
			}]
		});
		alert.present();
	}

	yourreward() {
		this.navCtrl.push(YourrewardPage);
	}
}
