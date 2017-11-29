import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-yourreward',
  templateUrl: 'yourreward.html'
})
export class YourrewardPage {

  private reward: Array<any>;

  constructor(public navCtrl: NavController) {
    let x = parseInt(localStorage.getItem("indexer"));

    for(let i = 0; i < x; i++){
      if (!this.reward){
        this.reward = [localStorage.getItem("reward_"+i)];
      }else{
        this.reward.push(localStorage.getItem("reward_"+i));
      }
    }
  }

}
