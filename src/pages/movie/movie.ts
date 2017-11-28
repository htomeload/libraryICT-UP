import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TechnologyPage } from '../technology/technology';
import { ExhibitionPage } from '../exhibition/exhibition';

@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage {
	
	private featured: {title: string, img: string, url: string};
	private data: Array<{index: number, img: string, starttime: string, url: string}>;
	private error: string; 
	private browserOptions: string;

  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private events: Events, private iab: InAppBrowser) {
		this.loadContent();
		this.events.publish("deactivate");
		this.browserOptions = "location=no,hardwareback=no";
  	}

	goPage(page){
		switch(page){
			case "exhibition":{
				this.navCtrl.setRoot(ExhibitionPage);
				break;
			}
			case "technology":{
				this.navCtrl.setRoot(TechnologyPage);
				break;
			}
		}
	}
	
	reload(event){
		if (event.progress > 1 && event.state === "refreshing"){
			if (typeof this.data !== "undefined"){
				this.data.length = 0;
			}
			
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
				this.error = "ไม่สามารถติดต่อกับเซิฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตแล้วดึงหน้านี้ลงเพื่อลองใหม่";
				loading.dismiss();
			}
		}, 5000);
		
		let xml = new XMLHttpRequest();
		xml.open("POST", "http://ictlibrarybeacon.xyz/api/movie/get/", true);
		xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = (() => {
			if (xml.readyState === 4 && xml.status === 200){
				sdata = JSON.parse(xml.responseText);
				
				let date = new Date();
				let h = date.getHours();
				let m = date.getMinutes();
				let hm = h.toString()+m.toString();
				
				for(let i = 0; i < sdata.rows; i++){
					if (!this.data){
						this.data = [{
							index: i,
							img: "http://ictlibrarybeacon.xyz/images/covermovie/"+sdata[i].movie_cover,
							starttime: sdata[i].movie_start,
							url: sdata[i].movie_trialler,
						}];
					}else{
						this.data.push({
							index: this.data.length,
							img: "http://ictlibrarybeacon.xyz/images/covermovie/"+sdata[i].movie_cover,
							starttime: sdata[i].movie_start,
							url: sdata[i].movie_trialler,
						});
					}
					
					if (!this.featured){
						let splits = sdata[i].movie_start.split(":");
						let hs = parseInt(splits[0]).toString()+"."+parseInt(splits[1]).toString();

						if (hm < hs){
							this.featured = {
								title: sdata[i].movie_name,
								img: "http://ictlibrarybeacon.xyz/images/covermovie/"+sdata[i].movie_cover,
								url: sdata[i].movie_trialler,
							};
						}
					}
				}
				
				loading.dismiss();
			}
		});
		xml.send();
	}

	playthis(url){
		let broswer = this.iab.create(url, '_self', this.browserOptions);
		broswer.show();
	}

}
