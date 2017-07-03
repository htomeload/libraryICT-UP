import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
	
	constructor(public navCtrl: NavController, public alertCtrl: AlertController, private storage: Storage) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://www.clm.up.ac.th/project/myLib/API/news/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send();
		
		xhr.onreadystatechange = popup;
		
		function popup(e){
			if (xhr.readyState == 4 && xhr.status == 200) {
				localStorage.setItem("popmessage", e.target.response);
			}
		}
		setTimeout(() => {
			let v = JSON.parse(localStorage.getItem("popmessage"));
			
			let temp = "<div style='text-align: center;'>"+
						"<h4>"+v[0].nu_title+"</h4>"+
						"<img style='margin: auto;' src='http://www.clm.up.ac.th/project/news_clm/uploadImg/"+v[0].nu_gallery_cover+"'></img>"+
					"</div>";
			let welcome = this.alertCtrl.create({
				title: 'ข่าวประชาสัมพันธ์',
				message: temp,
				buttons: ['ปิด'],
			});
			welcome.present();
			localStorage.removeItem("popmessage");
		}, 500);
	}

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