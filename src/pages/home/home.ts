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
	
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'This is alerty!',
      subTitle: 'I like drawinggggggggggggggggggggggg!',
	  buttons: ['ok'],
    });
    alert.present();
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
					console.log(data);
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
		console.log(data);
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