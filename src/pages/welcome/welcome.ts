import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  	constructor(public navCtrl: NavController) {
  	}
	
	start() {
		this.navCtrl.setRoot(HomePage);
	}
}
