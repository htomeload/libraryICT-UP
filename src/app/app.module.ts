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

/*import { BLE } from '@ionic-native/ble';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { LocationAccuracy } from '@ionic-native/location-accuracy';*/

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
  	],
  	providers: [
    	StatusBar,
    	SplashScreen,
		/*BLE,
		Toast,
		BackgroundMode,
		LocalNotifications,
		Geolocation,
		LocationAccuracy,*/
    	{provide: ErrorHandler, useClass: IonicErrorHandler}
  	]
})
export class AppModule {}
