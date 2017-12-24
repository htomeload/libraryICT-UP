import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { YourrewardPage } from '../yourreward/yourreward';

@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html'
})
export class RewardPage {

	private ownername: string;
	private reward: {id: number, name: string, picture: string};

	constructor(public navCtrl: NavController, private alertCtrl: AlertController, private navParams: NavParams) {
		let i = localStorage.getItem("indexer");

		if (i === "" || i === "NaN"){
			localStorage.setItem("indexer", "0");
		}

		let reward = this.navParams.get("reward");
		console.log(reward);
		this.reward = {
			id: parseInt(reward.id),
			name: reward.name,
			picture: "http://ictlibrarybeacon.xyz/images/coverreward/"+reward.picture,
		};
	}

	savereward(){
		let i = parseInt(localStorage.getItem("indexer"));
		i++;

		localStorage.setItem("reward_"+String(i), this.ownername);
		localStorage.setItem("reward_id"+String(i), this.reward.id.toString());
		localStorage.setItem("reward_name"+String(i), this.reward.name);
		localStorage.setItem("reward_picture"+String(i), this.reward.picture);
		localStorage.setItem("indexer", String(i));

		let alert = this.alertCtrl.create({
			title: "ระบบ",
			message: "ดำเนินการบันทึกแล้ว",
			buttons: [{
				text: "รับทราบ",
				handler: () => {
					this.ownername = "";
					this.navCtrl.setRoot(YourrewardPage);
				}
			}]
		});
		alert.present();
	}

	yourreward() {
		this.navCtrl.push(YourrewardPage);
	}
}
