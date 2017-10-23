import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';

import { TechnologyPage } from '../technology/technology';
import { NewbookPage } from '../newbook/newbook';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
	
	private featured: string;
	private title: string;
	private data: Array<{title: string, content: string}>;
	private error: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events) {
		//this.loadContent();
		this.featured = "assets/m/f.png";
		this.title = "The Social Network";
		this.data = [
			{
				title: "กิจกรรมสัมมนาวิชาการวิทยาการคอมพิวเตอร์",
				content: "สาขาวิชาวิทยาการจัดการคอมพิวเตอร์ คณะ ICT จัดกิจกรรมสัมมนาวิชาการวิทยาการคอมพิวเตอร์ หัวข้อ ?Automated Testing in Continuo....."
			},
			{
				title: "คว้ารางวัลชมเชย การแข่งขัน NSC 2017",
				content: "นิสิตสาขาวิชาวิทยาการคอมพิวเตอร์ คณะเทคโนโลยีสารสนเทศและการสื่อสารคว้ารางวัลชมเชย การแข่งขันพัฒนาโปรแกรมคอมพิวเตอร์แห....."
			}
		];
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
		let loading = this.loadingCtrl.create({
			spinner: 'dots',
			content: 'Loading Please Wait...'
		});
		
		loading.present();
		
		/*let xml = new XMLHttpRequest();
		xml.open("POST", "http://ictlibrarybeacon.xyz/api/book/get/", true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = (() => {
			if (xml.readyState == 4 && xml.status == 200){
				let sdata = JSON.parse(xml.responseText);
				
				for(let i = 1; i < sdata.rows; i++){
					if (i > 0){
						this.data.push({
							"img": sdata[i].pic_book,
						});
					}else{
						this.featured = sdata[i].pic_book;
					}
				}
				
				loading.dismiss();
			}/*else{
				this.error += "xml.readyState : "+JSON.stringify(xml.readyState)+" &&&& ";
				this.error += "xml.status : "+JSON.stringify(xml.status)+" ========== ";
			}
		});
		xml.send("action=test");*/
	}

}
