import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';

import { MapaddPage } from "../mapadd/mapadd";

import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-beaconrang',
  templateUrl: 'beaconrang.html'
})
export class BeaconrangPage {
	
	private beacon: {identifier: string, uuid?: string, major?: number, minor?: number, lastfour?: string};
	private rangged: any;
	public meter: number;
	public lastfour: string;
	
  	constructor(public navCtrl: NavController, private events: Events, private ibeacon: IBeacon, public alertCtrl: AlertController, 
			    private navParams: NavParams){
		this.events.publish("deactivate");
		
		let v = this.navParams.get("beacon");
		this.beacon = {
			identifier: v.id,
			uuid: v.uuid,
			major: v.major,
			minor: v.minor,
			lastfour: v.lastfour,
		}
		this.lastfour = v.lastfour;
		
		this.ragging();
  	}
	
	ionViewWillLeave(){
		this.ibeacon.stopRangingBeaconsInRegion(this.rangged).then(() => {
			console.log("Kill ranging region");
		});
	}

	chosenIt(meters){
		const alert = this.alertCtrl.create({
			title: "ยืนยันระยะนี้ ?",
			message: meters+" เมตร",
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						this.navCtrl.push(MapaddPage, {beacon: this.beacon, meter: this.meter});
					}
				},
				{
					text: "ยกเลิก",
					handler: () => {
					}
				}
			]
		});
		alert.present();
	}
					 
	ragging(){
		if (typeof this.beacon !== 'undefined'){
			console.log("Preparing to monitor beacon.");
			
			this.rangged = this.ibeacon.BeaconRegion(this.beacon.identifier, this.beacon.uuid, this.beacon.major, this.beacon.minor);
			
			console.log("Got beacon region : "+JSON.stringify(this.rangged));

			// Start ragging beacon
			this.ibeacon.startRangingBeaconsInRegion(this.rangged).then(
				() => console.log('Native layer recieved the request to ragging'),
				error => console.error('Native layer failed to begin ragging: ', error)
			);

			let delegate = this.ibeacon.Delegate();

			// Detect for ragged beacon in region
			delegate.didRangeBeaconsInRegion().subscribe(
				data => {
					if (data.beacons.length > 0){
						console.log("Ragging found!");
						console.log("data is "+JSON.stringify(data));

						// Calculation meter from ragged data
						this.meter = parseFloat(((data.beacons[0].tx*data.beacons[0].accuracy)/data.beacons[0].rssi).toFixed(2));

						console.log("Beacon "+data.region.identifier+" is far about "+this.meter+" meter");
					}
				},
				error => console.log(error),
			);
		}else{ // ---> No beacon for ragging
			console.log("typeof this.beacon[0] is undefined");
		}
	}

}
