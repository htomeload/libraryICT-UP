import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AdminloginPage } from '../adminlogin/adminlogin';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  	constructor(public navCtrl: NavController) {
  	}
	
	admin(){
		this.navCtrl.push(AdminloginPage);
	}
	
	start() {
		this.navCtrl.setRoot(HomePage);
	}
}
