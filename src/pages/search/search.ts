import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
 
@Component({
  templateUrl: 'search.html'
})
export class SearchPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
	public word = "";
	public content = {};
	public tester = "test";
 
	constructor(public navCtrl: NavController, private storage: Storage ) {
	}

	searchNow(){
		var i = 0;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://www.clm.up.ac.th/project/local_database/api/search_test.php', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send("word="+this.word);
		
		xhr.onreadystatechange = pushresult;
		
		function pushresult(e){
			var v = JSON.parse(e.target.response);
			
			console.log(v);
			this.tester = v;
		}
		
		
	}
	
	/*
	var v = JSON.parse(e.target.response);
			
			if (xhr.readyState == 4 && xhr.status == 200) {
				for(i = 0; i < v.length; i++){
					document.cookie = "result"+i+"="+v[i];
				}
			}
			
			for(var j = 0; j < i; j++){
			var name = "result"+j+"=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					this.content.push(c.substring(name.length, c.length));
				}
			}
		}
	*/
}
