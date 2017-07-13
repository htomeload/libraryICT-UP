import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
 
@Component({
  templateUrl: 'search.html'
})
export class SearchPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
	constructor(public navCtrl: NavController) {
	}
  
	public word = "";
	public message = {mes1: "ผลลัพธ์การค้นหาจะแสดงผลที่นี้ หากผลการค้นหาไม่แสดง ให้กดที่ปุ่มแว่นขยายอีกครั้ง"}
	public content = new Array();
	public flagShow = false;
	public codeUser = "";

	searchNow(){
		if (this.flagShow)
			this.content = Array();
		
		if (this.word == ''){
			this.content = Array();
			this.flagShow = false;
			this.message.mes1 = "กรุณาพิมพ์คำค้นหาที่ต้องการก่อน";
		}else{
			let str = "word="+this.word;
			let xhr = new XMLHttpRequest();
			//xhr.open('POST', 'http://localhost/libraryICT-UP/api/searchbook/', true);
			xhr.open('POST', 'http://www.clm.up.ac.th/project/local_database/API/', true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(str);
		
			let pushresult = ((e) => {
				if (xhr.readyState == 4 && xhr.status == 200){
					let v = JSON.parse(e.target.response);
					
					//if (v.success){
						if (v.rows > 0)
							this.flagShow = true;
						
						for(let i = 0; i < v.rows; i++){
							if (this.content.indexOf(v[i].title) == -1){
								//this.content.push({"content": v[i].book_name});
								this.content.push({"content": v[i].title});
							}
						}
					//}
				}
			});
		
			xhr.onreadystatechange = pushresult;
		}
	}
	
	
}
