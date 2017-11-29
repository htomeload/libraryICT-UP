import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';

@Component({
  selector: 'page-yourreward',
  templateUrl: 'yourreward.html'
})
export class YourrewardPage {

  private reward: Array<any>;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    let x = parseInt(localStorage.getItem("indexer"));

    for(let i = 0; i < x; i++){
      if (!this.reward){
        this.reward = [localStorage.getItem("reward_"+i)];
      }else{
        this.reward.push(localStorage.getItem("reward_"+i));
      }
    }

    if (x < 1){
      let alert = this.alertCtrl.create({
        title: "ระบบ",
        message: "ไม่พบรางวัลถูกบันทึกภายในเครื่อง",
        buttons: [{
          text: "ปิด",
        }]
      });
      alert.present();
    }
  }

}
