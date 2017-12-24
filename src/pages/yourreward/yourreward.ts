import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';

@Component({
  selector: 'page-yourreward',
  templateUrl: 'yourreward.html'
})
export class YourrewardPage {

  private reward: Array<{index: number, id: number, owner: string, name: string, picture: string}>;
  private show: boolean;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    let x = parseInt(localStorage.getItem("indexer"));
    this.show = true;

    if (x.toString() === "" || x.toString() === "NaN"){
      localStorage.setItem("indexer", "0");
      x = 0;
    }

    this.loadReward();
  }

  loadReward(){
    let x = parseInt(localStorage.getItem("indexer"));

    for(let i = 1; i <= x; i++){
      if (!this.reward){
        this.reward = [{
          index: 1,
          id: parseInt(localStorage.getItem("reward_id"+i)),
          owner: localStorage.getItem("reward_"+i),
          name: localStorage.getItem("reward_name"+i),
          picture: localStorage.getItem("reward_picture"+i)
        }];
      }else{
        this.reward.push({
          index: i,
          id: parseInt(localStorage.getItem("reward_id"+i)),
          owner: localStorage.getItem("reward_"+i),
          name: localStorage.getItem("reward_name"+i),
          picture: localStorage.getItem("reward_picture"+i),
        });
      }
    }

    if (x < 1 || typeof x === "undefined"){
      this.show = false;
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

  redeem(index){
    this.usereward(index);

    setTimeout(() => {
      let lerty = this.alertCtrl.create({
        title: "ระบบ",
        message: "คูปองได้ถูกใช้งานแล้ว",
        buttons: [{
          text: "รับทราบ",
          handler: () => {
            let xdex: number = index-1;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "http://ictlibrarybeacon.xyz/api/reward/cut/", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            
            let result = () => {
              if (xhr.status === 200 && xhr.readyState === 4){
                let obj = JSON.parse(xhr.responseText);
                console.log(obj);

                if (obj.success){
                  console.log("Successfully on cutting reward.");
                  this.reward.length = 0;
                  this.loadReward();
                }else{
                  console.log("Error on cutting reward.");
                  this.reward.length = 0;
                  this.loadReward();
                }
              }
            }

            xhr.onreadystatechange = result;
            xhr.send("id="+this.reward[xdex].id);
          },
        }],
      });
      lerty.present();
    }, 1000);
  }

  drop(index){
    this.usereward(index);

    setTimeout(() => {
      let lerty = this.alertCtrl.create({
        title: "ระบบ",
        message: "คูปองได้ถูกลบออกจากแอพพลิเคชั่นแล้ว",
        buttons: [{
          text: "รับทราบ",
          handler: () => {
            this.reward.length = 0;
            this.loadReward();
          },
        }],
      });
      lerty.present();
    }, 1000);
  }

  usereward(index){
    let x: number = parseInt(localStorage.getItem("indexer"));

    localStorage.removeItem("reward_"+index);
    localStorage.removeItem("reward_id"+index);
    localStorage.removeItem("reward_name"+index);
    localStorage.removeItem("reward_picture"+index);

    for(let i = 1; i <= x; i++){
      let tmp = localStorage.getItem("reward_"+i);

      if (!tmp){
        for(let j = i+1; j <= x; j++){
          let tmp2 = localStorage.getItem("reward_"+j);

          if (typeof tmp2 === "string"){
            localStorage.setItem("reward_"+i, localStorage.getItem("reward_"+j));
            localStorage.setItem("reward_id"+i, localStorage.getItem("reward_id"+j));
            localStorage.setItem("reward_name"+i, localStorage.getItem("reward_name"+j));
            localStorage.setItem("reward_picture"+i, localStorage.getItem("reward_picture"+j));
            localStorage.removeItem("reward_"+j);
            localStorage.removeItem("reward_id"+j)
            localStorage.removeItem("reward_name"+j);
            localStorage.removeItem("reward_picture"+j);
            break;
          }
        }
      }
    }
    
    localStorage.setItem("indexer", (x-1).toString());
  }

}
