import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-newbook',
  templateUrl: 'newbook.html'
})
export class NewbookPage {
	
	public featured: string;
	public data = [];
	public obsercon: any;
	public error: string;
	
  	constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
		this.error = "";
		this.loadContent();
  	}

	loadContent(){
		let loading = this.loadingCtrl.create({
			spinner: 'dots',
			content: 'Loading Please Wait...'
		});
		
		loading.present();
		
		let xml = new XMLHttpRequest();
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
			}*/
		});
		xml.send("action=test");
	}

}
