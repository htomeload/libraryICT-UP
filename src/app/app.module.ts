import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { NewbookPage } from '../pages/newbook/newbook';
import { SearchPage } from '../pages/search/search';
import { GuidemapPage } from '../pages/guidemap/guidemap';
import { RewardPage } from '../pages/reward/reward';
import { YourrewardPage } from '../pages/yourreward/yourreward';
import { MoviePage } from '../pages/movie/movie';
import { NewsPage } from '../pages/news/news';
import { BookInfoPage } from '../pages/bookinfo/bookinfo';
import { BookPage } from '../pages/book/book';
import { ExhibitionPage } from '../pages/exhibition/exhibition';
import { TechnologyPage } from '../pages/technology/technology';
import { SoftwarePage } from '../pages/software/software';
import { AdminloginPage } from '../pages/adminlogin/adminlogin';
import { BeaconaddPage } from '../pages/beaconadd/beaconadd';
import { BeaconrangPage } from '../pages/beaconrang/beaconrang';
import { MapaddPage } from '../pages/mapadd/mapadd';
import { LandadderPage } from "../pages/landadder/landadder";

import { BLE } from '@ionic-native/ble';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Toast } from '@ionic-native/toast';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { IBeacon } from '@ionic-native/ibeacon';

import { BeaconsDBProvider } from '../provider/beacons/beacons';

@NgModule({
  	declarations: [
    	MyApp,
    	HomePage,
		WelcomePage,
		NewbookPage,
		SearchPage,
		GuidemapPage,
		RewardPage,
		YourrewardPage,
		MoviePage,
		NewsPage,
		BookInfoPage,
		BookPage,
		ExhibitionPage,
		TechnologyPage,
		SoftwarePage,
		AdminloginPage,
		BeaconaddPage,
		BeaconrangPage,
		MapaddPage,
		LandadderPage,
  	],
  	imports: [
    	BrowserModule,
    	IonicModule.forRoot(MyApp)
  	],
  	bootstrap: [IonicApp],
  	entryComponents: [
    	MyApp,
    	HomePage,
		WelcomePage,
		NewbookPage,
		SearchPage,
		GuidemapPage,
		RewardPage,
		YourrewardPage,
		MoviePage,
		NewsPage,
		BookInfoPage,
		BookPage,
		ExhibitionPage,
		TechnologyPage,
		SoftwarePage,
		AdminloginPage,
		BeaconaddPage,
		BeaconrangPage,
		MapaddPage,
		LandadderPage,
  	],
  	providers: [
    	StatusBar,
    	SplashScreen,
		BLE,
		Toast,
		BackgroundMode,
		LocalNotifications,
		LocationAccuracy,
		IBeacon,
		BeaconsDBProvider,
    	{provide: ErrorHandler, useClass: IonicErrorHandler}
  	]
})
export class AppModule {}
