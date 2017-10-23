import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';

import { MoviePage } from '../movie/movie';
import { SoftwarePage } from '../software/software';

@Component({
  selector: 'page-exhibition',
  templateUrl: 'exhibition.html'
})
export class ExhibitionPage {
	
	private data: Array<{index: number, name: string, img: string, detail: string}>;
	private select: Array<{index: number, name: string, img: string, detail: string}>;
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
			case "software":{
				this.navCtrl.setRoot(SoftwarePage);
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

	selectThis(index){
		this.select = [{
			index: this.data[index].index,
			name: this.data[index].name,
			img: this.data[index].img,
			detail: this.data[index].detail,
		}];
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
							detail: sdata[i].book_description
						});
					}else{
						this.data = [{
							index: i,
							name: sdata[i].book_name,
							img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
							detail: sdata[i].book_description
						}];
						this.select = [{
							index: i,
							name: sdata[i].book_name,
							img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
							detail: sdata[i].book_description
						}];
					}
				}
				
				loading.dismiss();
			}/*else{
				this.error += "xml.readyState : "+JSON.stringify(xml.readyState)+" &&&& ";
				this.error += "xml.status : "+JSON.stringify(xml.status)+" ========== ";
			}*/
		});
		xml.send("action=latest");
	}

	clear() {
		this.error = "";
		if (this.data){
			this.data.length = 0;
		}
	}
}
