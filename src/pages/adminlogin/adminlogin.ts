import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';

import { BeaconaddPage } from "../beaconadd/beaconadd";
import { WelcomePage } from "../welcome/welcome";

@Component({
  selector: 'page-adminlogin',
  templateUrl: 'adminlogin.html'
})
export class AdminloginPage {
	
	private username: string;
	private password: string;

  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
		this.events.publish("deactivate");
  	}

	auth(){
		let v: any;
		
		const loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'กำลังดำเนินการ'
		});
		loading.present();
		
		setTimeout(() => {
			if (!v){
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
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/login/admin/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		let result = (() => {
			if (xhr.status === 200 && xhr.readyState === 4){
				v = JSON.parse(xhr.responseText);
				
				loading.dismiss();
				
				let lerty = this.alertCtrl.create({
					title: v.title,
					message: v.msg,
					buttons: [
						{
							text: "รับทราบ",
							handler: () => {
								if (v.success){
									localStorage.setItem("staffid", v.staffid);
									this.navCtrl.push(BeaconaddPage);
								}else{
									this.navCtrl.setRoot(WelcomePage);
								}
							}
						}
					],
				});
				lerty.present();
			}
		});
		
		xhr.onreadystatechange = result;
		xhr.send("username="+this.username+"&password="+this.password);
	}
}
