import { Component } from '@angular/core';
import { NavController, Events, AlertController, LoadingController } from 'ionic-angular';

import { BeaconrangPage } from "../beaconrang/beaconrang";

import { BLE } from '@ionic-native/ble';

import { BeaconsDBProvider } from '../../provider/beacons/beacons';

@Component({
  selector: 'page-beaconadd',
  templateUrl: 'beaconadd.html'
})
export class BeaconaddPage extends BeaconsDBProvider {
	
	private scanres: Array<{index: number, id: string, uuid?: string, major?: number, minor?: number, lastfour?: string}>;
	private active: boolean;
	
  	constructor(public navCtrl: NavController, private events: Events, private ble: BLE, public alertCtrl: AlertController, public loadingCtrl: LoadingController){
		super();
		this.events.publish("deactivate");
		this.active = true;
		this.scanble();
  	}

	ionViewWillLeave(){
		this.active = false;
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

	chosenIt(index){
		const alert = this.alertCtrl.create({
			title: "เลือกรายการนี้ ?",
			message: "NAME&nbsp;:&nbsp;"+this.scanres[index].lastfour+"<br /><br />ID&nbsp;:&nbsp;"+this.scanres[index].id,
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						this.isexist(index);
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

	isexist(index){
		let val: any;
		
		const loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'กำลังตรวจสอบ'
		});
		loading.present();
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/beacon/isexist/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		setTimeout(() => {
			if (!val){
				let lerty = this.alertCtrl.create({
					title: "ติดต่อเซิฟเวอร์ไม่ได้",
					message: "โปรดตรวจการเชื่อมต่อ เช่น WiFi และลองใหม่",
					buttons:[
						{
							text: "รับทราบ",
							handler: () => {
								loading.dismiss();
							}
						}
					],
				});
				lerty.present();
			}
		}, 5000);
		
		let result = (() => {
			if (xhr.status === 200 && xhr.readyState === 4){
				val = JSON.parse(xhr.responseText);
				
				loading.dismiss();
				
				if (val.rows > 0){
					let lerty = this.alertCtrl.create({
						title: "พบรายการซ้ำ",
						message: "รายการ "+this.scanres[index].id+" มีอยู่แล้วในฐานข้อมูล",
						buttons:[
							{
								text: "รับทราบ",
								handler: () => {
								}
							}
						],
					});
					lerty.present();
				}else{
					this.navCtrl.push(BeaconrangPage, {"beacon": this.scanres[index]});
				}
			}
		});
		
		xhr.onreadystatechange = result;
		xhr.send("id="+this.scanres[index].id);
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

	getlastfour(id){
		let array = id.split(":");
		
		return array[4].toString()+array[5].toString();
	}
	
	scanble() {
		// Scan for beacon
		this.ble.scan([], 1).subscribe(result => {
			let id: string = result.id;
			let uuid: string = result.advertising? this.buffertouuid(result.advertising):"";
			let major: number = result.advertising? this.getmajor(new Uint8Array(result.advertising)):0;
			let minor: number = result.advertising? this.getminor(new Uint8Array(result.advertising)):0;
			let lastfour: string = this.getlastfour(id);

			if (typeof this.scanres === 'undefined'){ // If for calling method in first time.
				if (this.checkbeaconsdb(result)){
					this.scanres = [{
						index: 0,
						id: id,
						uuid: uuid,
						major: major,
						minor: minor,
						lastfour: lastfour,
					}];
					console.log("Gaining first beacon "+JSON.stringify(result));
				}
			}else if (this.scanres.length === 0){ // If for calling method first time in repeatly.
				if (this.checkbeaconsdb(result)){
					this.scanres = [{
						index: 0,
						id: id,
						uuid: uuid,
						major: major,
						minor: minor,
						lastfour: lastfour,
					}];
					console.log("Gaining first beacon with length = 0 "+JSON.stringify(result));
				}
			}else{ // ---> Check in case of duplicate collected beacon
				for(let i = 0, x = this.scanres.length; i < x; i++){
					if (result.id === this.scanres[i].id){
						break;
					}
					if (i === x-1){
						if (this.checkbeaconsdb(result)){
							this.scanres.push({
								index: this.scanres.length,
								id: id,
								uuid: uuid,
								major: major,
								minor: minor,
								lastfour: lastfour,
							});
							console.log("Gaining another beacon "+JSON.stringify(result));
						}
					}
				}
			}
		});
		setTimeout(() => { // ---> Prepare for ragging
			console.log("Collecting beacon time out");
			console.log("Start scanble() method");
			
			if (this.active){
				this.scanble();
			}
		}, 1100);
	}

}
