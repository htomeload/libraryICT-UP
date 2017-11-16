import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams, LoadingController } from 'ionic-angular';

import { WelcomePage } from "../welcome/welcome";

@Component({
  selector: 'page-landadder',
  templateUrl: 'landadder.html'
})
export class LandadderPage {
	
	private v: {id: string, meter: number, placex: number, placey: number, staffid?: number, lastfour?: string};
	private beacon: {identifier: string, uuid?: string, major?: number, minor?: number, lastfour?: string};
	public letter: any;
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, private navParams: NavParams, 
			    public loadingCtrl: LoadingController){
		this.events.publish("deactivate");
		
		this.beacon = this.navParams.get("beacon");
		
		this.letter = ["A", "B", "C", "D", "E", "F", "G"];
		
		let id = this.beacon.identifier;
		let meter = this.navParams.get("meter");
		let placex = this.navParams.get("placex");
		let placey = this.navParams.get("placey");
		let lastfour = this.beacon.lastfour;
		
		this.v = {id: id, meter: meter, placex: placex, placey: placey, staffid: parseInt(localStorage.getItem("staffid")), lastfour: lastfour};
  	}
	
	ionViewWillLeave(){
		
	}

	chosenIt(){
		const alert = this.alertCtrl.create({
			title: "ยืนยันบันทึกข้อมูล ?",
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						this.addplace();
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

	addplace(){
		let msg: any;
		
		const loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'กำลังดำเนินการ'
		});
		loading.present();
		
		setTimeout(() => {
			if (!msg){
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
		
		let str: string = "uuid="+this.beacon.uuid+"&major="+this.beacon.major+"&minor="+this.beacon.minor+"&id="+this.beacon.identifier+"&meter="+this.v.meter+"&place_x="+this.v.placex+"&place_y="+this.v.placey+"&staffid="+this.v.staffid;
		console.log("send request to server with param: "+str);
		//loading.dismiss();
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/beacon/addplace/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		let insert = (() => {
			if (xhr.status === 200 && xhr.readyState === 4){
				msg = JSON.parse(xhr.responseText);
				
				loading.dismiss();
				
				let lerty = this.alertCtrl.create({
					title: msg.title,
					message: msg.msg,
					buttons: [
						{
							text: "รับทราบ",
							handler: () => {
								localStorage.removeItem("staffid");
								this.navCtrl.setRoot(WelcomePage);
							}
						}
					],
				});
				lerty.present();
			}
		});
		
		xhr.onreadystatechange = insert;
		xhr.send(str);
	}

}
