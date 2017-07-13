import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BLE } from '@ionic-native/ble';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	
	private blelist = new Array();
	public beacon = new Array();
	public cont = "";
	public blechar = new Array();
	
	constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage, private ble: BLE, private ibeacon: IBeacon) {
		this.ble.isEnabled().then(() => {
			this.connectBleBeacon();
		}, () => {
			this.ble.enable().then(() => {
				this.connectBleBeacon();
			});
		});
	}
	
	connectBleBeacon(){
		this.ble.startScan([]).subscribe(device => {
			this.blelist.push(device);
			
			if (this.blelist.length > 0){
				this.ble.stopScan().then(() => {
					this.cont = "Scaning device found! ";
				});
			
				this.ble.connect(device.id).subscribe(() => {
					this.cont += "Device with id "+device.id+" is connected";
				});
			}
		});
	}

/*
				Connect:
{
	"characteristics":[
		{"characteristic":"2a00","service":"1800","properties":["Read","Write"]},
		{"characteristic":"2a01","service":"1800","properties":["Read"]},
		{"characteristic":"2a04","service":"1800","properties":["Read"]},
		{"descriptors":[{"uuid":"2902"}],"characteristic":"2a05","service":"1801","properties":["Indicate"]},
		"descriptors":[{"uuid":"2902"}],"characteristic":"2a37","service":"180d","properties":["Read","Notify"]},
		{"characteristic":"2a38","service":"180d","properties":["Read"]},
		{"characteristic":"2a39","service":"180d","properties":["Write"]},
		{"characteristic":"2a29","service":"180a","properties":["Read"]},
		{"characteristic":"2a24","service":"180a","properties":["Read"]},
		{"characteristic":"2a25","service":"180a","properties":["Read"]},
		{"characteristic":"2a27","service":"180a","properties":["Read"]},
		{"characteristic":"2a26","service":"180a","properties":["Read"]},
		{"characteristic":"2a28","service":"180a","properties":["Read"]}
	],
	"advertising":{},
	"id":"D0:1A:29:4B:5D:47",
	"services":["1800","1801","180d","180a"],
	"rssi":-59,
	"name":"HRM1"
}
*/

  getReward() {
	this.storage.get('nameText').then((data) => {
		
	if (data == null){
		let prompt = this.alertCtrl.create({
			title: 'รับรางวัล',
			message: 'กรุณากรอกชื่อและนามสกุลในการรับรางวัลครั้งแรก',
			inputs: [
			{
				name: 'nameText',
				placeholder: 'สำหรับการยืนยันสิทธิ์ในรางวัล',
			},
		],
		buttons: [
			{
				text: 'ไว้คราวหลัง',
				handler: data => {
					let alert = this.alertCtrl.create({
						title: 'รับรางวัล',
						subTitle: 'โปรดกลับมาเพิ่มเติมรายละเอียดเพื่อยืนยันสิทธืในรางวัลของท่าน',
						buttons: ['ok'],
					});
					alert.present();
				},
			},
			{
				text: 'บันทึก',
				handler: data => {
					let alert = this.alertCtrl.create({
						title: 'รับรางวัล',
						subTitle: 'ขอบคุณ คุณ '+data.nameText+' ที่ให้ความร่วมมือ!',
						buttons: ['ok'],
					});
					this.storage.set("nameText", data.nameText);
					alert.present();
				},
			},
		],
		});
		prompt.present();
	}else{
		let alert = this.alertCtrl.create({
			title: 'รับรางวัล',
			subTitle: 'ขอบคุณ คุณ '+data+' ที่ให้ความร่วมมือ!',
			buttons: [
				{
					text: 'ลบข้อมูล',
					handler: data => {
						let alert = this.alertCtrl.create({
							title: 'รับรางวัล',
							subTitle: 'การลบข้อมูลนี้ไม่สามารถย้อนกลับได้ ยืนยันการลบข้อมูล',
							buttons: [
								{
									text: 'ยืนยัน',
									handler: data => {
										let alert = this.alertCtrl.create({
											title: 'รับรางวัล',
											subTitle: 'ลบข้อมูลเรียบร้อย',
											buttons: ['ok'],
										});
										this.storage.remove("nameText");
										alert.present();
									},
								},
								{
									text: 'ยกเลิก',
									handler: data => {
										let alert = this.alertCtrl.create({
											title: 'รับรางวัล',
											subTitle: 'ยกเลิกการลบเรียบร้อย',
											buttons: ['ok'],
										});
										alert.present();
									},
								},
							],
						});
						alert.present();
					},
				},
				{
					text: 'ปิด',
				},
			],
		});
		alert.present();
	}
	
	});
  }

}