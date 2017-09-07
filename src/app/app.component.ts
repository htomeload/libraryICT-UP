import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { NewbookPage } from '../pages/newbook/newbook';
import { SearchPage } from '../pages/search/search';
import { RewardPage } from '../pages/reward/reward';

@Component({
  	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = WelcomePage;
	pages: Array <{title: string, component: any, icon: string, index?: number}>;
	loggedname: string;
	loggedscore: number;
	beaprMem = [];
	interupt: boolean;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController) {
		
		this.initializeApp();
		
		this.pages = [
			{title: 'หน้าหลัก', component: HomePage, icon: 'md-home', index: 0},
			{title: 'ดูเนื้อหา', component: NewbookPage, icon: 'md-easel', index: 1},
			{title: 'ค้นหาหนังสือ', component: SearchPage, icon: 'md-search', index: 2},
			{title: 'รางวัล', component: RewardPage, icon: 'md-medal', index: 0},
		];
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
	 
	openPage(page) {
		this.nav.setRoot(page.component);
	}

	gotoFB(){
		let alert = this.alertCtrl.create({
			title: "ข้อความ",
			message: "ข้อความ",
			buttons: [
				{
					text: "รับทราบ",
					handler: () => {

					}
				},
			]
		});
		alert.present();
	}
}

