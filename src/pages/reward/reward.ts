import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { YourrewardPage } from '../yourreward/yourreward';

@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html'
})
export class RewardPage {

  	constructor(public navCtrl: NavController) {
  	}
	
	yourreward() {
		this.navCtrl.push(YourrewardPage);
	}
}
