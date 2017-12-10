import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';

import { MapaddPage } from "../mapadd/mapadd";

@Component({
  selector: 'page-mapchoice',
  templateUrl: 'mapchoice.html'
})
export class MapchoicePage {
	
	private v: {beacon: any, meter: number};
	private map: Array<{index: number, id: number, name: string, bg: string, row: number, col: number}>;
	private loading: boolean;
	private index: number;
	private msg: string;
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, private navParams: NavParams){
		this.events.publish("deactivate");
		
		let beacon = this.navParams.get("beacon");
		let meter = this.navParams.get("meter");
		
		this.v = {beacon: beacon, meter: meter};
		this.loading = true;
		
		this.loadcontent();
  	}
	
	ionViewWillLeave(){
		
	}

	showvalue(index){
		console.log("current choice : "+index);
	}

	reset(){
		if (typeof this.map !== "undefined"){
			this.map.length = 0;
		}
		
		this.msg = "";
		this.loading = true;
	}

	reload(event){
		if (event.progress > 1 && event.state === "refreshing"){
			this.loadcontent();
			setTimeout(() => {
				event.complete();
			}, 1000);
		}else if (event.state === "cancelling"){
			event.cancel();
		}
	}

	chosenIt(){
		const alert = this.alertCtrl.create({
			title: "ยืนยันเป็นแผนที่นี้ ?",
			message: this.map[this.index].name,
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						this.navCtrl.push(MapaddPage, {beacon: this.v.beacon, meter: this.v.meter, map: this.map[this.index]});
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

	loadcontent(){
		let val: any;
		this.reset();

		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/map/get/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		setTimeout(() => {
			if (!val){
				this.loading = false;
				this.msg = "ไม่สามารถติดต่อกับเซิฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตแล้วดึงหน้านี้ลงเพื่อโหลดหน้าใหม่";
			}
		}, 5000);
		
		let push = (() => {
			if (xhr.status === 200 && xhr.readyState === 4){
				val = JSON.parse(xhr.responseText);

				this.loading = false;

				for(let i = 0; i < val.rows; i++){
					if (!this.map){
						this.map = [{
							index: i,
							id: val[i].mapbg_id,
							name: val[i].mapbg_levelname,
							bg: "http://ictlibrarybeacon.xyz/images/"+val[i].mapbg_name,
							row: val[i].mapbg_row,
							col: val[i].mapbg_col,
						}];
					}else{
						this.map.push({
							index: i,
							id: val[i].mapbg_id,
							name: val[i].mapbg_levelname,
							bg: "http://ictlibrarybeacon.xyz/images/"+val[i].mapbg_name,
							row: val[i].mapbg_row,
							col: val[i].mapbg_col,
						});
					}
				}
			}
		});
		
		xhr.send();
		xhr.onreadystatechange = push;
	}
}
