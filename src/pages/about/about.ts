import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	public data = {username: "", password: ""};
	public res = {message: "", message2: "", flagShow: false, showPass: false};

	constructor(public navCtrl: NavController) {
		let v = localStorage.getItem("user_name");
		if (v != '' && v != null){
			this.res.message2 = v;
			this.res.flagShow = true;
		}
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
					
				localStorage.setItem('user_name', v.GetStudentInfoResult.FirstName_TH+' '+v.GetStudentInfoResult.LastName_TH);
				localStorage.setItem('code_name', v.GetStudentInfoResult.StudentCode);
			}
		}
		
		setTimeout(() => {
			
			let v = localStorage.getItem("user_name");
			
			if (v != '' && v != null){
				this.res.message2 = v;
			}
		
			v = localStorage.getItem("code_name");
			if (v != '' && v != null){
				this.res.flagShow = true;
				this.res.message += ' บันทึกข้อมูลการเข้าสู่ระบบแล้ว';
			}
		
		}, 2000);
	}
	
	public outFunc(){
		this.res.flagShow = false;
		this.res.message = "";
		localStorage.removeItem("user_name");
		localStorage.removeItem("code_name");
		this.res.message2 = "";
	}

}
