import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { NewbookPage } from '../pages/newbook/newbook';
import { SearchPage } from '../pages/search/search';
import { MoviePage } from '../pages/movie/movie';
import { RewardPage } from '../pages/reward/reward';
import { NewsPage } from '../pages/news/news';
import { BookPage } from '../pages/book/book';
import { ExhibitionPage } from '../pages/exhibition/exhibition';
import { TechnologyPage } from '../pages/technology/technology';
import { SoftwarePage } from '../pages/software/software';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Toast } from '@ionic-native/toast';
import { BLE } from '@ionic-native/ble';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Device } from '@ionic-native/device';

import { BeaconsDBProvider } from '../provider/beacons/beacons';

@Component({
  	templateUrl: 'app.html'
})
export class MyApp extends BeaconsDBProvider {
	@ViewChild(Nav) nav: Nav;

	public rootPage: any = WelcomePage;
	private pages: Array <{title: string, component: any, icon: string, index?: number}>;
	/*private loggedname: string;
	private loggedscore: number;*/
	private rc: number;
	private active: boolean;
	private scanres: Array<{id: string, uuid?: string, major?: number, minor?: number, meter?: number}>;
	private ragged: Array<{identifier: string, uuid: string, major?: number, minor?: number, tried?: number}>;
	private checkBGDelay: number;
	private special: boolean;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private alertCtrl: AlertController, 
				private locationAccuracy: LocationAccuracy, private ble: BLE, public events: Events, private backgroundMode: BackgroundMode, 
				private localNotifications: LocalNotifications, private toast: Toast, private ibeacon: IBeacon, public loadingCtrl: LoadingController, 
				private device: Device) {
		super();

		// initial some property.
		this.rc = 0;
		this.initializeApp();
		this.active = false;
		this.checkBGDelay = 3000;
		this.special = false;
		
		// initial page indexs property.
		this.pages = [
			{title: 'หน้าหลัก', component: HomePage, icon: 'md-home', index: 0},
			{title: 'ดูเนื้อหา', component: NewbookPage, icon: 'md-easel', index: 1},
			{title: 'ค้นหาหนังสือ', component: SearchPage, icon: 'md-search', index: 2},
			{title: 'รางวัล', component: RewardPage, icon: 'md-medal', index: 0},
		];
		
		// requires user to enable OS service once time.
		this.coreservice();
		this.backgroundMode.enable(); // ---> enable background mode.
		
		// Set action of notifications.
		this.localNotifications.on("click", data => {
			let v = JSON.parse(data.data);
			
			console.log("Data's page is "+v.page);
			switch(v.page){
				case "newbook":{
					console.log("Now go to NewbookPage");
					this.nav.setRoot(NewbookPage);
					break;
				}
				case "movie":{
					console.log("Now go to MoviePage");
					this.nav.setRoot(MoviePage);
					break;
				}
				case "news":{
					console.log("Now go to NewsPage");
					this.nav.setRoot(NewsPage);
					break;
				}
				case "book":{
					console.log("Now go to BookPage");
					this.nav.setRoot(BookPage);
					break;
				}
				case "exhibition":{
					console.log("Now go to ExhibitionPage");
					this.nav.setRoot(ExhibitionPage);
					break;
				}
				case "technology":{
					console.log("Now go to TechnologyPage");
					this.nav.setRoot(TechnologyPage);
					break;
				}
				case "software":{
					console.log("Now go to SoftwarePage");
					this.nav.setRoot(SoftwarePage);
					break;
				}
			}
		});
		
		this.checkInBGMode(); // Activate activation method checker.
		
		// events to control core method.
		this.events.subscribe("scanble", () => {
			this.scanble();
		});
		this.events.subscribe("activate", () => {
			if (!this.active){
				console.log("Activation is change to "+this.active);
				this.active = true;
				this.scanble();
			}
		});
		this.events.subscribe("deactivate", () => {
			this.active = false;
			console.log("Activation is change to "+this.active);
		});
		
		this.scanble(); // Finally, active scanble() method() in case it not activated.
	}

	initializeApp() {
		this.platform.ready().then(() => {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
	 
	coreservice() {
		this.ble.isEnabled().then(() => {
				console.log("ble is already enabled");
				console.log("check gps service");
				let loading = this.loadingCtrl.create({
					spinner: 'dots',
					content: 'กำลังสร้างคำขอตำแหน่งพิกัด'
				});
				loading.present();
				this.locationAccuracy.canRequest().then((canRequest: boolean) => { // ---> request GPS service.
					if(canRequest) {
						console.log("gps can be requested");
						console.log("ask user to take action on enabling gps service");
						loading.dismiss();
						// the accuracy option will be ignored by iOS
						this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
							() => console.log('gps request successful'),
							error => console.log('Error requesting location permissions', error)
						);
					}else{
						console.log("gps can't be requested");
						loading.dismiss();
					}
				});
			}, 
			() => {
				console.log("ble is not enabled");
				console.log("ask user to take action on enabling ble service");
				this.ble.enable().then(() => { // ---> request BLE service.
					console.log("ble service being enabled");
					console.log("check ble enabling service status");
					this.ble.isEnabled().then(() => {
							console.log("ble be enabled by user");
							console.log("check gps service");
							let loading = this.loadingCtrl.create({
								spinner: 'dots',
								content: 'กำลังสร้างคำขอตำแหน่งพิกัด'
							});
							loading.present();
							this.locationAccuracy.canRequest().then((canRequest: boolean) => { // ---> request GPS service.
								if(canRequest) {
									console.log("gps can be requested");
									console.log("ask user to take action on enabling gps service");
									loading.dismiss();
									// the accuracy option will be ignored by iOS
									this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
										() => console.log('Request successful'),
										error => console.log('Error requesting location permissions', error)
									);
								}else{
									console.log("gps can't be requested");
									loading.dismiss();
								}
							});
						}, 
						() => {
							console.log("something went wrong in enabling ble service");
							console.log("ask for enabling ble service again");
							this.coreservice();
						}
					);
				},
					() => {
						console.log("user reject to enabling ble service");
						console.log("ask for enabling ble service again");
						let alert = this.alertCtrl.create({
							title: "ระบบ",
							message: "โปรดเปิดใช้งานบูลธูทเพื่อประสบการณ์การใช้ห้องสมุด ICT ที่ดียิ่งขึ้น",
							buttons: [
								{
									text: "รับทราบ",
									handler: () => {
										this.coreservice();
									}
								},
							]
						});
						alert.present();
					}
				); 
			}
		);
	}
	 
	checkInBGMode(){
		// Check for background mode is activated then scan for beacon.
		setTimeout(() =>{
			if (this.backgroundMode.isActive()){
				console.log("Background mode is activated.");
				if (!this.active){
					this.events.publish("activate");
				}else{
					console.log("Scan BLE is already activated.");
				}
			}else{
				console.log("User is using app, background mode is not activated.");
			}
			this.checkInBGMode();
		}, this.checkBGDelay);
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
	 
	checkbeaconsdb(beacon){
		let obj: any = this.beacons;
		let x: number = this.beacons.length;
		
		for(let i = 0; i < x; i++){
			if (beacon.id === obj[i].identifier){
				console.log("found matched id "+beacon.id+" in beacons in-app database");
				return true;
			}
		}
		
		console.log("beacon id "+beacon.id+" is not match with in-app database");
		return false;
	}
	 
	buffertouuid(buffer){
		// convert advertise of beacon to Uint8Array then convert to string and strip part of string which refered to UUID.
		let raw: string = Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
		let strip: string = raw.substring(18, 50); // ---> part of string which refered to UUID.
		
		let uuid: Array<{part1: string, part2: string, part3: string, part4: string, part5: string}>;
		
		// split strip string into 5 parts.
		uuid = [
			{
				part1: strip.substring(0, 8),
				part2: strip.substring(8, 12),
				part3: strip.substring(12, 16),
				part4: strip.substring(16, 20),
				part5: strip.substring(20, 32),
			}
		];
		
		// return joined right format UUID.
		return (uuid[0].part1+"-"+uuid[0].part2+"-"+uuid[0].part3+"-"+uuid[0].part4+"-"+uuid[0].part5).toUpperCase();
	}
	 
	getmajor(buffer) {
		// convert byte of Uint8Array in prefer index into integer value and joined as string.
		let major: string = ((buffer[25] & 0xff) * 0x100 + (buffer[26] & 0xff)).toString();
		return parseInt(major); // ---> return value as integer.
	}

	getminor(buffer) {
		// convert byte of Uint8Array in prefer index into integer value and joined as string.
		let minor: string = ((buffer[27] & 0xff) * 0x100 + (buffer[28] & 0xff)).toString();
		return parseInt(minor); // ---> return value as integer.
	}

	scanble() {
		if (this.active){
			// Check for duplicate calling method
			if (this.rc === 0){
				this.rc = 1;
			}else{
				console.log("Kill duplicate calling method scanble()");
				
				return true;
			}
			
			// Scan for beacon
			this.ble.scan([], 1).subscribe(result => {
				let id: string = result.id;
				let uuid: string = result.advertising? this.buffertouuid(result.advertising):"";
				let major: number = result.advertising? this.getmajor(new Uint8Array(result.advertising)):0;
				let minor: number = result.advertising? this.getminor(new Uint8Array(result.advertising)):0;

				if (typeof this.scanres === 'undefined'){ // If for calling method in first time.
					if (this.checkbeaconsdb(result)){
						this.scanres = [{
							id: id,
							uuid: uuid,
							major: major,
							minor: minor,
						}];
						console.log("Gaining first beacon "+JSON.stringify(result));
					}
				}else if (this.scanres.length === 0){ // If for calling method first time in repeatly.
					if (this.checkbeaconsdb(result)){
						this.scanres = [{
							id: id,
							uuid: uuid,
							major: major,
							minor: minor,
						}];
						console.log("Gaining first beacon with length = 0 "+JSON.stringify(result));
					}
				}else{ // ---> Check in case of duplicate collected beacon
					if (this.checkbeaconsdb(result)){
						for(let i = 0, x = this.scanres.length; i < x; i++){
							if (result.id === this.scanres[i].id){
								break;
							}
							if (i === x-1){
								this.scanres.push({
									id: id,
									uuid: uuid,
									major: major,
									minor: minor,
								});
							}
						}
						console.log("Gaining another beacon "+JSON.stringify(result));
					}
				}
			});
			setTimeout(() => { // ---> Prepare for ragging
				this.rc = 0;
				
				console.log("Collecting beacon time out");
				console.log("Start ragging() method");
				this.ragging();
			}, 1100);
		}else{ // ---> Activation is false
			console.log("No collecting for beacon");
			console.log("Activation is "+this.active);
			this.rc = 0;
			
			if (typeof this.scanres !== 'undefined')
				this.scanres.length = 0;
		}
	}
	 
	ragging(){
		if (typeof this.scanres !== 'undefined'){
			console.log("Preparing to monitor beacon.");
			// Create instance beacon region
			if (typeof this.scanres[0] !== 'undefined'){
				for(let i = 0; i < this.scanres.length; i++){
					let rangged: any;
					
					if (!this.ragged || i === 0){
						this.ragged = [{
							identifier: this.scanres[i].id, 
							uuid: this.scanres[i].uuid,
							major: this.scanres[i].major,
							minor: this.scanres[i].minor,
							tried: 0,
						}];
						rangged = this.ibeacon.BeaconRegion(this.scanres[i].id, this.scanres[i].uuid, this.scanres[i].major, this.scanres[i].minor);
					}else{
						this.ragged.push({
							identifier: this.scanres[i].id, 
							uuid: this.scanres[i].uuid,
							major: this.scanres[i].major,
							minor: this.scanres[i].minor,
							tried: 0,
						});
						rangged = this.ibeacon.BeaconRegion(this.scanres[i].id, this.scanres[i].uuid, this.scanres[i].major, this.scanres[i].minor);
					}

					console.log("Got beacon region : "+JSON.stringify(rangged));

					// Start ragging beacon
					this.ibeacon.startRangingBeaconsInRegion(rangged).then(
						() => console.log('Native layer recieved the request to ragging'),
						error => console.error('Native layer failed to begin ragging: ', error)
					);

					let delegate = this.ibeacon.Delegate();

					// Detect for ragged beacon in region
					delegate.didRangeBeaconsInRegion().subscribe(
						data => {
							if (this.ragged[i].tried < 10){
								if (data.beacons.length > 0){
									console.log("Ragging found!");
									console.log("data is "+JSON.stringify(data));

									// Calculation meter from ragged data
									let meter: number = (data.beacons[0].tx*data.beacons[0].accuracy)/data.beacons[0].rssi;

									console.log("Beacon "+data.region.identifier+" is far about "+parseFloat(meter.toFixed(2))+" meter");

									// Stop ragging for beacon
									this.ibeacon.stopRangingBeaconsInRegion(rangged);

									console.log("Stop ragging for beacon "+data.region.identifier);

									// Set meter to right avaliable collected beacon
									for(let j = 0; j < this.scanres.length; j++){
										if (this.scanres[j].id === data.region.identifier){
											this.scanres[j].meter = parseFloat(meter.toFixed(2));

											console.log("Got correct ID with ragged beacon");

											console.log("Start loadContent() method");
											this.loadContent();
										}
									}
								}else if (this.ragged[i].tried < 10){
									this.ragged[i].tried += 1;

									console.log("Tried "+this.ragged[i].tried+" time(s) for ragging beacon "+data.region.identifier);

									if (this.ragged[i].tried > 9){
										for(let j = 0; j < this.scanres.length; j++){
											if (this.scanres[j].id === data.region.identifier){
												this.scanres[j].meter = 9999;

												console.log("Got correct ID with ragged beacon");

												console.log("Terminate failed ragging beacon "+data.region.identifier);
												this.ibeacon.stopRangingBeaconsInRegion(rangged);

												console.log("Start loadContent() method");
												this.loadContent();
											}
										}
									}
								}
							}
						},
						error => console.log(error),
					);
				}
			}else{
				console.log("typeof this.scanres[0] is undefined");
				console.log("Start scanble() method");
				
				return this.scanble();
			}
			
		}else{ // ---> No beacon for ragging
			console.log("typeof this.scanres[0] is undefined");
			console.log("Start scanble() method");
			return this.scanble();
		}
	}
	 
	loadContent() {
		if (typeof this.scanres[0] !== "undefined"){
			// Prepare to send request to server
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "http://ictlibrarybeacon.xyz/api/beacon/check/", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			let result = (() => {
				if (xhr.status === 200 && xhr.readyState === 4){
					let v = JSON.parse(xhr.responseText);
					console.log(v);
					
					// Create notification and toast message with response from server
					this.localNotifications.schedule({
						id: 1,
						text: v.message,
						data: {page: v.page}
					});
					console.log("Got "+v.page+" from server, Notification is fire now.");
					this.toast.show(v.message, '5000', 'bottom').subscribe(
						toast => {
							console.log("Toast message pop!");
						}
					);
				}
			});

			xhr.onreadystatechange = result;
			let minmeter: number;
			let minid: string;
			
			for(let i = 0; i < this.scanres.length; i++){
				if (typeof this.scanres[i].meter === "undefined"){
					console.log("Ranging is not finish all job");
					console.log("Terminate loadcontent()");
					return;
				}
				
				if (i === 0){
					minmeter = this.scanres[i].meter;
					minid = this.scanres[i].id;
				}else{
					if (this.scanres[i].meter < minmeter){
						minmeter = this.scanres[i].meter;
						minid = this.scanres[i].id;
					}
				}
			}
			
			if (typeof minmeter === "undefined"){
				minmeter = this.scanres[0].meter;
				minid = this.scanres[0].id;
			}
			
			xhr.send("id="+minid+"&meter="+minmeter+"&device="+this.device.serial); // ---> Sending request
			console.log("Send request to server with param: id="+minid+"&meter="+minmeter+"&device="+this.device.serial);
			
			// Set value to initial value
			this.rc = 0;
			this.scanres.length = 0;
			if (this.active){ // ---> Change activation state
				console.log("Activation is "+this.active);
				setTimeout(() => {
					this.scanble();
					this.checkBGDelay = 1800000;
				}, 1800000);
			}
		}else{ // ---> No beacon for sending request to server
			console.log("typeof this.scanres[0] is undefined");
			console.log("Start scanble() method");
			setTimeout(() => {
				this.scanble();
				this.checkBGDelay = 60000;
			}, 60000);
		}
	}
}

