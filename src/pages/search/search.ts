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
		let v = localStorage.getItem("code_name");
		if (v != '' && v != null){
			this.codeUser = v;
		}else{
			this.codeUser = "57021229";
		}
			
		if (this.flagShow){
			this.message.mes1 = "ผลลัพธ์การค้นหาจะแสดงผลที่นี้ หากผลการค้นหาไม่แสดง ให้กดที่ปุ่มแว่นขยายอีกครั้ง";
			this.content = new Array();
			this.flagShow = false;
		}
		
		if (this.word == '' || this.word == null){
			this.content = new Array();
			this.flagShow = false;
			this.message.mes1 = "กรุณาพิมพ์คำค้นหาที่ต้องการก่อน";
		}
		
		var i = 0;
		var str = "word="+this.word+"&username="+this.codeUser;
		console.log(this.codeUser);
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://www.clm.up.ac.th/project/myLib/API/searchAlist/', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
		
		xhr.onreadystatechange = pushresult;
		
		function pushresult(e){
			console.log(e);
			if (xhr.readyState == 4 && xhr.status == 200){
				/*var v = JSON.parse(e.target.response);
				
				for(i = 0; i < v.rows; i++){
					document.cookie = "result"+i+"="+v[i].title;
				}*/
			}
		}
		
		/*if (this.word != '' && this.word != null){
			var j = 0;
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			
			for(var k = 0; k < ca.length; k++){
				var name = "result"+j+"=";
				var c = ca[k];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					if (!this.flagShow){
						this.flagShow = true;
					}
					if (typeof c.substring(name.length, c.length) != "object" && c.substring(name.length, c.length) != '' && c.substring(name.length, c.length) != null){
						this.content.push({"content":c.substring(name.length, c.length)});
						j++;
					}
				}
			}
		}*/
	}
	
	
}
