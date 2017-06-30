import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public data = {username: "", password: ""};
	public res = {message: "", message2: "", flagShow: false};

	constructor(public navCtrl: NavController, private storage: Storage ) {
		this.storage.get("loggedName").then((data) => {
			if (data != '' && data != null){
				this.res.message2 = data;
				this.res.flagShow = true;
			}
		});
	}
	
	public loginFunc() {
	    this.res.message = 'กำลังล็อกอิน ชื่อผู้ใช้ '+this.data.username;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', "http://www.clm.up.ac.th/service/login_student_mod.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send('username='+this.data.username+'&password='+this.data.password);
 
		xhr.onreadystatechange = processRequest;
 
		function processRequest(e){
			if (xhr.readyState == 4 && xhr.status == 200) {
				var v = JSON.parse(e.target.response);
					
				document.cookie = 'user_name='+v.GetStudentInfoResult.FirstName_TH+' '+v.GetStudentInfoResult.LastName_TH;
			}
		}
		
		var name = "user_name=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				this.res.flagShow = true;
				this.res.message2 += c.substring(name.length, c.length);
				this.storage.set("loggedName", c.substring(name.length, c.length));
				this.res.message += ' บันทึกข้อมูลการเข้าสู่ระบบแล้ว';
			}
		}
	}
	
	public outFunc(){
		this.res.flagShow = false;
		this.res.message = "";
		this.storage.remove("loggedName");
		this.res.message2 = "";
	}

}
