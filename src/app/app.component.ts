<<<<<<< HEAD
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
=======
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
>>>>>>> 62c50e0ae5aa6f2d183c243752e4cf2e74ee9f98

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
  rootPage:any = TabsPage;
=======
	@ViewChild(Nav) nav: Nav;
	
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
>>>>>>> 62c50e0ae5aa6f2d183c243752e4cf2e74ee9f98

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
<<<<<<< HEAD
=======
	
	this.pages = [
		{title: 'Homepage', component: HomePage, icon: 'home'},
		{title: 'About', component: AboutPage, icon: 'pulse'},
		{title: 'Contact', component: ContactPage, icon: 'chatbubbles'},
	];
  }
  
  openPage(page){
	  this.nav.setRoot(page.component);
>>>>>>> 62c50e0ae5aa6f2d183c243752e4cf2e74ee9f98
  }
}
