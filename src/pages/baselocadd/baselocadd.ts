import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';

import { LocaddPage } from "../locadd/locadd";

@Component({
  selector: 'page-baselocadd',
  templateUrl: 'baselocadd.html'
})
export class BaselocaddPage {
	
	private v: {beacon: any, meter: number};
	private baseloc: Array<{index: number, name: string, value: number}>;
	private choice: string;
	private nameplace: string;
	private loading: boolean;
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, private navParams: NavParams){
		this.events.publish("deactivate");
		
		let beacon = this.navParams.get("beacon");
		let meter = this.navParams.get("meter");
		
		this.v = {beacon: beacon, meter: meter};
		this.choice = "";
		this.nameplace = "";
		this.loading = true;
		
		this.loadcontent();
  	}
	
	ionViewWillLeave(){
		
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
			title: "ยืนยันเป็นสถานที่นี้ ?",
			message: this.choice !== ""? this.baseloc[parseInt(this.choice)-1].name:this.nameplace,
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						let bl = this.choice !== ""? this.baseloc[parseInt(this.choice)-1].name:this.nameplace;
						let ch = this.choice !== ""? this.baseloc[parseInt(this.choice)-1].value:"";
						
						this.navCtrl.push(LocaddPage, {beacon: this.v.beacon, meter: this.v.meter, baseloc: bl, choicer: ch});
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

	reset(){
		if (typeof this.baseloc !== "undefined"){
			this.baseloc.length = 0;
		}
		
		this.loading = true;
	}

	loadcontent(){
		this.reset();
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/baselocation/get/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		setTimeout(() => {
			if (!this.baseloc){
				this.loading = false;
			}
		}, 5000);
		
		let push = (() => {
			if (xhr.status === 200 && xhr.readyState === 4){
				let val = JSON.parse(xhr.responseText);
				
				if (val.rows > 0){
					this.loading = false;
				}
				
				for(let i = 0; i < val.rows; i++){
					if (!this.baseloc){
						this.baseloc = [{
							index: 0,
							name: val[i].baselocation_name,
							value: val[i].baselocation_id,
						}];
					}else{
						this.baseloc.push({
							index: this.baseloc.length,
							name: val[i].baselocation_name,
							value: val[i].baselocation_id,
						});
					}
				}
				
				console.log("this.baseloc "+JSON.stringify(this.baseloc));
			}
		});
		
		xhr.send();
		xhr.onreadystatechange = push;
	}

}
