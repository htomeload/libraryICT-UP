import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public data = {username: "", password: ""};
	public res = {message: ""};

	constructor(public navCtrl: NavController, private storage: Storage ) {
	}
	
	public loginFunc() {
	    this.res.message = 'กำลังล็อกอิน ชื่อผู้ใช้ '+this.data.username+' รหัสผ่าน '+this.data.password;
		var xhr = new XMLHttpRequest();
		xhr.open('POST', "//www.clm.up.ac.th/service/login_student_mod.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send('username='+this.data.username+'&password='+this.data.password);
 
		xhr.onreadystatechange = processRequest;
 
		function processRequest(e){
			var txt = "";
			
			if (xhr.readyState == 4 && xhr.status == 200) {
				var v = JSON.parse(e.target.response);
					
				txt = 'ข้อมูลการเข้าระบบของท่าน '+v.GetStudentInfoResult.FirstName_TH+' '+v.GetStudentInfoResult.LastName_TH;
			}
		}
	}

}
