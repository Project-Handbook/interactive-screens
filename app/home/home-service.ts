import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()

export class HomeService{
	url: string = "https://www.kth.se/cm/";
	constructor(private _http:Http){}
	getCalendar(){
		var calendar_polopoly_id = "1.467916";
		return this._http.get(this.url + calendar_polopoly_id).map(res=>res.text());
	}
	getNewsFeed(){
		var news_polopoly_id = "1.640564"
		return this._http.get(this.url + news_polopoly_id)
			.map(res => res.text())
			.map(res=>{
				//Add https://kth.se infront of every image url
				var regex = new RegExp("/polopoly_fs/1.+/image/.+\.(jpg|png)","g");
				var image_urls = res.match(regex);
				image_urls.forEach(image=>{
					res = res.replace(image,"https://www.kth.se" + image);
				})
				var blocks = jQuery(res).find(".blockItem");
				var news_items="";
				/*Replaces the class name of every news block, currently supports three different layouts
					Image on top and text in the bottom, floating image to the right and text on the left and
					blocks without any media.
				*/
				for(var i=0;i<blocks.length;i++){
						var regex_top = new RegExp("<div class=\"tlc cid-1_[0-9]{6} no-categories\\sblock[\\s\\w]+[top|bottom][\\s\\w]+[^n][^o][^M][^e][^d][^i][^a]\">","gi");
						var regex_right = new RegExp("<div class=\"tlc cid-1_[0-9]{6} no-categories\\sblock[\\s\\w]+[right|left][\\s\\w]+[^n][^o][^M][^e][^d][^i][^a]\">","gi");
						var regex_match;
						if(regex_top.test(blocks[i].innerHTML)){
							regex_match = blocks[i].innerHTML.match(regex_top);
							blocks[i].innerHTML = blocks[i].innerHTML.replace(regex_match[0],"<div class=\"block_image_top\">");
						}else if(regex_right.test(blocks[i].innerHTML)){
							regex_match = blocks[i].innerHTML.match(regex_right);
							blocks[i].innerHTML = blocks[i].innerHTML.replace(regex_match[0],"<div class=\"block_image_right\">");
						}
						news_items= news_items + blocks[i].innerHTML;
				}
				return res;
			});
		}
}
