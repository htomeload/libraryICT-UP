import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';

import { BookPage } from '../book/book';
import { ExhibitionPage } from '../exhibition/exhibition';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-software',
  templateUrl: 'software.html'
})
export class SoftwarePage {
	
	private data: Array<{index: number, name: string, content?: Array<{sname: string, img: string, link: string}>}>;
	private error: string;
	private browserOptions: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events, private iab: InAppBrowser) {
		this.events.publish("deactivate");
		this.loadContent();
		this.browserOptions = "location=no,hardwareback=no";
  	}

	openLink(link){
		let browser = this.iab.create(link, '_self', this.browserOptions);
		browser.show();
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
			this.loadContent();
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
		xml.open("POST", "http://ictlibrarybeacon.xyz/api/software/get/", true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = (() => {
			if (xml.readyState === 4 && xml.status === 200){
				this.clear();
				
				sdata = JSON.parse(xml.responseText);
				
				for(let i = 0; i < sdata.rows; i++){
					if (!this.data){
						this.data = [{
							index: i,
							name: sdata[i].software_kind,
						}];
						for(let j = 0; j < sdata[i].rows; j++){
							if (!this.data[i].content){
								this.data[i].content = [{
									sname: sdata[i][j].software_name,
									img: "http://ictlibrarybeacon.xyz/images/coversoftware/"+sdata[i][j].software_cover,
									link: sdata[i][j].software_linkdownload,
								}];
							}else{
								this.data[i].content.push({
									sname: sdata[i][j].software_name,
									img: "http://ictlibrarybeacon.xyz/images/coversoftware/"+sdata[i][j].software_cover,
									link: sdata[i][j].software_linkdownload,
								});
							}
						}
					}else{
						this.data.push({
							index: this.data.length,
							name: sdata[i].software_kind,
						});
						for(let j = 0; j < sdata[i].rows; j++){
							if (!this.data[i].content){
								this.data[i].content = [{
									sname: sdata[i][j].software_name,
									img: "http://ictlibrarybeacon.xyz/images/coversoftware/"+sdata[i][j].software_cover,
									link: sdata[i][j].software_linkdownload,
								}];
							}else{
								this.data[i].content.push({
									sname: sdata[i][j].software_name,
									img: "http://ictlibrarybeacon.xyz/images/coversoftware/"+sdata[i][j].software_cover,
									link: sdata[i][j].software_linkdownload,
								});
							}
						}
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
