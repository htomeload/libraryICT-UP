import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deploy } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { SearchPage } from '../pages/search/search';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public deploy: Deploy) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
	
	this.pages = [
		{title: 'Homepage', component: HomePage, icon: 'home'},
		{title: 'Search', component: SearchPage, icon: 'search'},
		{title: 'About', component: AboutPage, icon: 'pulse'},
		{title: 'Contact', component: ContactPage, icon: 'chatbubbles'},
	];
  }
  
  openPage(page){
	  this.nav.setRoot(page.component);
  }
}
