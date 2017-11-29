import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';

import { TechnologyPage } from '../technology/technology';
import { NewbookPage } from '../newbook/newbook';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
	private data: Array<{title: string, content: string, img: string}>;
	private error: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events) {
		this.loadContent();
		this.events.publish("deactivate");
  	}

	goPage(page){
		switch(page){
			case "technology":{
				this.navCtrl.setRoot(TechnologyPage);
				break;
			}
			case "newbook":{
				this.navCtrl.setRoot(NewbookPage);
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

		setTimeout(() => {
			if (!sdata){
				this.clear();
				loading.dismiss();
				this.error = "ไม่พบการเชื่อมต่ออินเตอร์เน็ต กรุณาเปิดใช้งานอินเตอร์เน็ตแล้วเลื่อนหน้านี้ลงเพื่อโหลดข้อมูลใหม่อีกครั้ง";
			}
		}, 5000);
		
		let xml = new XMLHttpRequest();
		xml.open("POST", "http://ictlibrarybeacon.xyz/api/news/get/", true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = (() => {
			if (xml.readyState == 4 && xml.status == 200){
				sdata = JSON.parse(xml.responseText);
				
				for(let i = 0; i < sdata.rows; i++){
					if (!this.data){
						this.data = [{
							title: sdata[i].sugcon_title,
							content: sdata[i].sugcon_content,
							img: "http://ictlibrarybeacon.xyz/images/coversugcon/"+sdata[i].sugcon_picture,
						}];
					}else{
						this.data.push({
							title: sdata[i].sugcon_title,
							content: sdata[i].sugcon_content,
							img: "http://ictlibrarybeacon.xyz/images/coversugcon/"+sdata[i].sugcon_picture,
						});
					}
				}
				
				loading.dismiss();
			}
		});
		xml.send();
	}

	clear(){
		this.error = "";
		if (typeof this.data !== "undefined"){
			this.data.length = 0;
		}
	}

}
