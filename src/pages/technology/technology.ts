import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';

import { MoviePage } from '../movie/movie';
import { NewsPage } from '../news/news';

@Component({
  selector: 'page-technology',
  templateUrl: 'technology.html'
})
export class TechnologyPage {
	
	private data: Array<{index: number, name: string, img: string, detail: string}>;
	private error: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events) {
		this.events.publish("deactivate");
		this.loadContent();
  	}

	goPage(page){
		switch(page){
			case "movie":{
				this.navCtrl.setRoot(MoviePage);
				break;
			}
			case "news":{
				this.navCtrl.setRoot(NewsPage);
				break;
			}
		}
	}

	reload(event){
		if (event.progress > 1 && event.state === "refreshing"){
			this.error = "";
			this.loadContent();
			setTimeout(() => {
				event.complete();
			}, 1000);
		}else if (event.state === "cancelling"){
			event.cancel();
		}
	}

	popInfo(index){
		console.log("Index is "+index);
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
		xml.open("POST", "http://ictlibrarybeacon.xyz/api/technology/get/", true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = (() => {
			if (xml.readyState == 4 && xml.status == 200){
				this.clear();
				
				sdata = JSON.parse(xml.responseText);
				
				for(let i = 0; i < sdata.rows; i++){
					if (typeof this.data === "undefined"){
						this.data = [{
							index: i,
							name: sdata[i].tecno_name,
							img: "http://ictlibrarybeacon.xyz/images/covertecno/"+sdata[i].tecno_picture,
							detail: sdata[i].tecno_content
						}];
					}else{
						this.data.push({
							index: this.data.length,
							name: sdata[i].tecno_name,
							img: "http://ictlibrarybeacon.xyz/images/covertecno/"+sdata[i].tecno_picture,
							detail: sdata[i].tecno_content
						});
					}
				}
				
				loading.dismiss();
			}
		});
		xml.send();
	}

	clear() {
		this.error = "";
		if (typeof this.data !== "undefined"){
			this.data.length = 0;
		}
	}
}
