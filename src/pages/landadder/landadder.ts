import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams, LoadingController } from 'ionic-angular';

import { WelcomePage } from "../welcome/welcome";

@Component({
  selector: 'page-landadder',
  templateUrl: 'landadder.html'
})
export class LandadderPage {
	
	private v: {id: string, meter: number, baseloc: string, loc: string, choicer: string, staffid?: number};
	private beacon: {identifier: string, uuid?: string, major?: number, minor?: number};
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, private navParams: NavParams, 
			    public loadingCtrl: LoadingController){
		this.events.publish("deactivate");
		
		this.beacon = this.navParams.get("beacon");
		
		let id = this.beacon.identifier;
		let meter = this.navParams.get("meter");
		let baseloc = this.navParams.get("baseloc");
		let loc = this.navParams.get("loc");
		let choicer = this.navParams.get("choicer");
		
		this.v = {id: id, meter: meter, baseloc: baseloc, loc: loc, choicer: choicer, staffid: 1};
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
		
		let str: string = "uuid="+this.beacon.uuid+"&major="+this.beacon.major+"&minor="+this.beacon.minor+"&id="+this.beacon.identifier+"&meter="+this.v.meter+"&baseloc="+this.v.baseloc+"&loc="+this.v.loc+"&staffid="+this.v.staffid+"&choicer="+this.v.choicer;
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
