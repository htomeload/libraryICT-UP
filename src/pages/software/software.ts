import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';

import { BookPage } from '../book/book';
import { ExhibitionPage } from '../exhibition/exhibition';

@Component({
  selector: 'page-software',
  templateUrl: 'software.html'
})
export class SoftwarePage {
	
	private data: Array<{index: number, name: string, content: Array<{sname: string, img: string, link: string}>}>;
	private error: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events) {
		this.events.publish("deactivate");
		this.data = [
			{
				index: 1,
				name: "Antivirus",
				content: [
					{
						 sname: "Iobit Malware Fighter",
						 img: "assets/rs/Iobit-Malware-Fighter-Pro-3-Crack-License-Key-Full-Download.png",
						 link: "https://www.google.com"
					},
					{
						 sname: "Avast Internet Security",
						 img: "assets/rs/avast_internet_security_2015_boxshot.png",
						 link: "https://www.google.com"
					},
					{
						 sname: "ESET NOD32",
						 img: "assets/rs/1466908677_eset-nod32-besplatno-notntivirus.png",
						 link: "https://www.google.com"
					}
				]
			},
			{
				index: 2,
				name: "Utilities software",
				content: [
					{
						 sname: "Advanced System Care",
						 img: "assets/rs/adv-hit2k.png",
						 link: "https://www.google.com"
					},
					{
						 sname: "Winrar",
						 img: "assets/rs/sw_winrar-Hit2k.png",
						 link: "https://www.google.com"
					},
					{
						 sname: "System Mechanic",
						 img: "assets/rs/sm_boxshot_large.png",
						 link: "https://www.google.com"
					}
				]
			},
		];
		//this.loadContent();
  	}

	openLink(link){
		window.open(link, '_blank');
	}

	goPage(page){
		switch(page){
			case "book":{
				this.navCtrl.setRoot(BookPage);
				break;
			}
			case "exhibition":{
				this.navCtrl.setRoot(ExhibitionPage);
				break;
			}
		}
	}

	reload(event){
		if (event.progress > 1 && event.state === "refreshing"){
			this.error = "";
			//this.loadContent();
			setTimeout(() => {
				event.complete();
			}, 1000);
		}else if (event.state === "cancelling"){
			event.cancel();
		}
	}

	loadContent(){
		let sdata: any;
		let loading = this.loadingCtrl.create({
			spinner: 'dots',
			content: 'Loading Please Wait...'
		});
		
		loading.present();
		
		/*setTimeout(() => {
			if (!sdata){
				this.clear();
				loading.dismiss();
				this.error = "ไม่พบการเชื่อมต่ออินเตอร์เน็ต กรุณาเปิดใช้งานอินเตอร์เน็ตแล้วเลื่อนหน้านี้ลงเพื่อโหลดข้อมูลใหม่อีกครั้ง";
			}
		}, 5000);
		
		let xml = new XMLHttpRequest();
		xml.open("POST", "http://ictlibrarybeacon.xyz/api/book/get/", true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = (() => {
			if (xml.readyState == 4 && xml.status == 200){
				this.clear();
				
				sdata = JSON.parse(xml.responseText);
				
				for(let i = 0; i < sdata.rows; i++){
					if (i > 0){
						this.data.push({
							index: i,
							name: sdata[i].book_name,
							img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
							lineshelf: parseInt(sdata[i].book_lineshelf),
							detail: sdata[i].book_description
						});
					}else{
						this.data = [{
							index: i,
							name: sdata[i].book_name,
							img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
							lineshelf: parseInt(sdata[i].book_lineshelf),
							detail: sdata[i].book_description
						}];
						this.select = [{
							index: i,
							name: sdata[i].book_name,
							img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
							lineshelf: parseInt(sdata[i].book_lineshelf),
							detail: sdata[i].book_description
						}];
					}
				}
				
				loading.dismiss();
			}/*else{
				this.error += "xml.readyState : "+JSON.stringify(xml.readyState)+" &&&& ";
				this.error += "xml.status : "+JSON.stringify(xml.status)+" ========== ";
			}
		});
		xml.send("action=latest");*/
	}

	clear() {
		this.error = "";
		if (this.data){
			this.data.length = 0;
		}
	}
}
