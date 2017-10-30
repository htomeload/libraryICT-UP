import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Events } from 'ionic-angular';

import { GuidemapPage } from '../guidemap/guidemap';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
	public word: string;
	private type: string;
	private order: string;
	private result: Array<{title: string, id: number, callno?: string, shelfline?: string}>;
	private indexer: Array<{title: string}>;
	private match: Array<{word: string, firstnon: string, lastnon: string, fullword: string}>;
	private typesearch: {title: string};
	private ordersearch: {title: string};
	private suggestloading: boolean;
	
  	constructor(public navCtrl: NavController, private events: Events, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
		this.events.publish("deactivate");
		
		this.word = "";
		this.type = "name";
		this.order = "DESC";
		this.suggestloading = false;
		
		this.typesearch = {title: "ค้นหา"};
		this.ordersearch = {title: "ค้นหา"};
  	}

	loadsuggestor(indexer: Array<{title: string}>){
		if (typeof indexer !== "undefined"){
			let x: number = indexer.length;
			if (typeof this.match !== "undefined"){
				this.match.length = 0;
			}
			
			if (this.word.length > 0){
				for(let i = 0; i < x; i++){
					let word: string = indexer[i].title;
					let exp = new RegExp(this.word);
					
					console.log("exp : ", exp);
					console.log("search word : "+this.word);
					console.log("search word length : "+this.word.length);
					console.log("regexp : "+this.word);
					console.log("exp.test("+word+") : "+JSON.stringify(exp.test(word)));

					if (exp.test(word)){
						let indexof: string = word.indexOf(this.word).toString();
						
						if (!this.match){
							if ((parseInt(indexof))+this.word.length <= word.length){
								this.match = [{
									firstnon: parseInt(indexof) > 0? word.substring(0, parseInt(indexof)):"",
									word: word.substring(parseInt(indexof), parseInt(indexof)+this.word.length),
									lastnon: (parseInt(indexof))+this.word.length <= word.length? word.substring((parseInt(indexof))+this.word.length, word.length):"",
									fullword: word,
								}];
							}
						}else{
							if ((parseInt(indexof))+this.word.length <= word.length){
								this.match.push({
									firstnon: parseInt(indexof) > 0? word.substring(0, parseInt(indexof)):"",
									word: word.substring(parseInt(indexof), parseInt(indexof)+this.word.length),
									lastnon: (parseInt(indexof))+this.word.length <= word.length? word.substring((parseInt(indexof))+this.word.length, word.length):"",
									fullword: word,
								});
							}
						}
					}
				}
				
				this.suggestloading = false;
				console.log("this.match : "+JSON.stringify(this.match));
			}else{
				this.suggestloading = false;
			}
		}else{
			this.suggestloading = false;
		}
	}

	searchsuggestor() {
		if (typeof this.match !== "undefined"){
			this.match.length = 0;
		}
		if (typeof this.indexer !== "undefined"){
			this.indexer.length = 0;
		}
		
		if (this.word.length > 0){
			this.suggestloading = true;
			
			setTimeout(() => {
				if (!this.indexer){
					this.suggestloading = false;
				}else if (this.indexer.length < 1){
					this.suggestloading = false;
				}
			}, 7000);
			
			let xhr = new XMLHttpRequest();
			xhr.open("POST", "http://ictlibrarybeacon.xyz/api/book/get/", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			
			let results = (() => {
				if (xhr.status === 200 && xhr.readyState === 4){
					let v = JSON.parse(xhr.responseText);

					for(let i = 0; i < v.rows; i++){
						if (!this.indexer){
							this.indexer = [{
								title: v[i].book_name,
							}];
						}else{
							this.indexer.push({
								title: v[i].book_name,
							});
						}
					}

					console.log(JSON.stringify(this.indexer));

					this.loadsuggestor(this.indexer);
				}
			});

			xhr.onreadystatechange = results;
			xhr.send("action=indexer&word="+this.word);
		}else{
			this.suggestloading = false;
		}
	}

	chooseword(fullword) {
		this.word = fullword;
		this.match.length = 0;
	}

	changeoptions() {
		if (this.word.length < 1){
			return;
		}else{
			if (typeof this.result === "undefined"){
				return;
			}else if (this.result.length < 1){
				return;
			}
		}
		
		return this.searching();
	}

	searching() {
		let v: any;
		
		if (typeof this.match !== "undefined"){
			this.match.length = 0;
		}
		
		if (typeof this.result !== "undefined"){
			this.result.length = 0;
		}
		
		const loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'กำลังค้นหา'
		});
		loading.present();
		
		setTimeout(() => {
			if (!v){
				let lerty = this.alertCtrl.create({
					title: "ติดต่อเซิฟเวอร์ไม่ได้",
					message: "โปรดตรวจการเชื่อมต่อ เช่น WiFi และลองใหม่",
					buttons:[
						{
							text: "รับทราบ",
							handler: () => {
								loading.dismiss();
							}
						}
					],
				});
				lerty.present();
			}
		}, 5000);
		
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "http://ictlibrarybeacon.xyz/api/book/search/", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		let pushrs = (() => {
			if (xhr.status === 200 && xhr.readyState === 4){
				v = JSON.parse(xhr.responseText);
				
				for(let i = 0; i < v.rows; i++){
					if (typeof this.result === "undefined"){
						this.result = [{
							title: v[i].book_name,
							id: v[i].book_id,
						}];
					}else{
						this.result.push({
							title: v[i].book_name,
							id: v[i].book_id,
						});
					}
				}
				
				loading.dismiss();
			}
		});
		
		xhr.onreadystatechange = pushrs;
		xhr.send("word="+this.word+"&typesearch="+this.type+"&order="+this.order);
	}
	
	openmap(id) {
		console.log("Got id "+id);
		this.navCtrl.push(GuidemapPage);
	}

}
