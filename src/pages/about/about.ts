import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	data = {};
	res = "";

  constructor(public navCtrl: NavController, private http: HTTP ) {

  }
  
  loginFunc(event) {
	  if (event.keyCode == 13){
		  this.http.post(
			'http://www.clm.up.ac.th/service/login_s.php', 
			{
			  '':this.data,
			}, 
			{}
		  ).then(val => {
			//this.res;
			console.log(val.data);
		  });
	  }
  }

}
