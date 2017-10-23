import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';

import { BookInfoPage } from '../bookinfo/bookinfo';
import { BookPage } from '../book/book';
import { NewsPage } from '../news/news';

@Component({
  selector: 'page-newbook',
  templateUrl: 'newbook.html'
})
export class NewbookPage {
	
	public featured: Array<{index: number, name: string, img: string, lineshelf: number, detail: string}>;
	public data: Array<{index: number, name: string, img: string, lineshelf: number, detail: string}>;
	public error: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events) {
		this.events.publish("deactivate");
		this.loadContent();
  	}

	goPage(page){
		switch(page){
			case "news":{
				this.navCtrl.setRoot(NewsPage);
				break;
			}
			case "book":{
				this.navCtrl.setRoot(BookPage);
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
	
	popbook(index){
		this.navCtrl.push(BookInfoPage, {"data": this.data[index]});
	}
	
	popfeaturedbook(index){
		this.navCtrl.push(BookInfoPage, {"data": this.featured[index]});
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
						if (!this.data){
							this.data = [{
								index: i-1,
								name: sdata[i].book_name,
								img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
								lineshelf: parseInt(sdata[i].book_lineshelf),
								detail: sdata[i].book_description
							}];
						}else{
							this.data.push({
								index: i-1,
								name: sdata[i].book_name,
								img: "http://ictlibrarybeacon.xyz/images/coverbook/"+sdata[i].book_cover,
								lineshelf: parseInt(sdata[i].book_lineshelf),
								detail: sdata[i].book_description
							});
						}
					}else{
						this.featured = [{
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
			}*/
		});
		xml.send("action=latest");
	}
	
	clear() {
		if (this.featured){
			this.featured.length = 0;
		}
		if (this.data){
			this.data.length = 0;
		}
	}
}
