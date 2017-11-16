import { Component } from '@angular/core';
import { NavController, Events, AlertController, NavParams } from 'ionic-angular';

import { LandadderPage } from "../landadder/landadder";

@Component({
  selector: 'page-mapadd',
  templateUrl: 'mapadd.html'
})
export class MapaddPage {
	
	private v: {beacon: any, meter: number};
	private forbid: Array<{index: number, name: string, place: string}>;
	public posx: Array<{x: number}>;
	public posy: Array<{y: number}>;
	public letter: any;
	private cx: number;
	private cy: number;
	private loading: boolean;
	private formpass: boolean;
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, private navParams: NavParams){
		this.events.publish("deactivate");
		
		let beacon = this.navParams.get("beacon");
		let meter = this.navParams.get("meter");
		
		this.v = {beacon: beacon, meter: meter};
		this.cx = 0;
		this.cy = 0;
		this.loading = true;
		this.letter = ["A", "B", "C", "D", "E", "F", "G"];
		this.formpass = false;
		
		for(let i = 0; i < 7; i++){
			if (i === 0){
				this.posx = [{x: i}];
				this.posy = [{y: i}];
			}else{
				this.posx.push({x: i});
				this.posy.push({y: i});
			}
		}
		
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
			title: "ยืนยันเป็นตำแหน่งนี้ ?",
			message: "คอลัมภ์&nbsp;&nbsp;:&nbsp;&nbsp;"+this.letter[this.cx]+"<br /><br />แถว&nbsp;&nbsp;:&nbsp;&nbsp;"+this.cy,
			buttons: [
				{
					text: "ตกลง",
					handler: () => {
						this.navCtrl.push(LandadderPage, {beacon: this.v.beacon, meter: this.v.meter, placex: this.cx, placey: this.cy});
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
		if (typeof this.forbid !== "undefined"){
			this.forbid.length = 0;
		}
		
		this.loading = true;
	}

	getlastfour(id){
		let array = id.split(":");
		
		return array[4].toString()+array[5].toString();
	}

	loadcontent(){
		this.reset();
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/beacon/exist/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		setTimeout(() => {
			if (!this.forbid){
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
					
					if (!this.forbid){
						this.forbid = [{
							index: 0,
							name: this.getlastfour(val[i].beacon_name),
							place: val[i].beacon_place,
						}];
					}else{
						this.forbid.push({
							index: this.forbid.length,
							name: this.getlastfour(val[i].beacon_name),
							place: val[i].beacon_place,
						});
					}
				}
				
				this.setcurpos();
			}
		});
		
		xhr.send();
		xhr.onreadystatechange = push;
	}

	changepos(){
		for(let i = 0; i < 7; i++){
			for(let j = 0; j < 7; j++){
				if (i === this.cy && j === this.cx){
					for(let k = 0, x = this.forbid.length; k < x; k++){
						if (this.forbid[k].place === this.cy+","+this.cx){
							const alert = this.alertCtrl.create({
								title: "ระบบ",
								message: "ตำแหน่งที่เลือกมี Beacon วางอยู่แล้ว โปรดเลือกตำแหน่งอื่น",
								buttons: [
									{
										text: "ปิด",
										handler: () => {
										}
									}
								]
							});
							alert.present();
							this.formpass = false;
							break;
						}
						if (k === x-1){
							let set: any = document.getElementById(this.cy+","+this.cx);
							
							set.style.backgroundColor = "red";
							this.formpass = true;
						}
					}
				}else{
					let set: any = document.getElementById(i+","+j);

					if (set.children.length === 0){
						set.style.backgroundColor = "unset";
					}
				}
			}
		}
	}

	setcurpos(){
		let set: any;
		
		for(let i = 0, x = this.forbid.length; i < x; i++){
			set = document.getElementById(this.forbid[i].place);
			
			set.style.backgroundColor = "green";
			set.style.textAlign = "center";
			set.style.verticalAlign = "middle";
			set.innerHTML = "<div style='margin: auto; color: white;' class='have-beacon'></div>";
		}
	}
}
