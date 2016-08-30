import { Component ,ViewEncapsulation,ViewChild,ElementRef,OnInit} from '@angular/core';
import { Http  } from '@angular/http';
import { HomeService } from './home-service';
import {ScreenSpecificInformation} from '../screen-specific-information';
import {Constants} from '../constants';
import {DomSanitizationService,SafeHtml} from '@angular/platform-browser';


@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.Native,
  templateUrl: './home.html',
  providers:[HomeService]

})
export class Home implements OnInit {
    //Contains the calendar HTML block.
    calendar_block: SafeHtml;
    //Contains the news event HTML blocks.
    news_block:Array<SafeHtml>=[];
    //Used to display error message on the screen in the case of failed HTTP request
    calendar_error:boolean;
    //Used to display error message on the screen in the case of failed HTTP request
    news_feed_error:boolean;


    @ViewChild('newsBlock') newsBlockElement;

    constructor(private homeService:HomeService,private elementRef:ElementRef,
                private sanitizer:DomSanitizationService){}

    //Returns the 4 latest calendar events from Polypoly through the home-service class
    getCalendar(id:string){
      if(id){
        this.homeService.getCalendar(id)
          .subscribe(res =>
            {this.calendar_block = this.sanitizer.bypassSecurityTrustHtml(res)},
            error=>{this.calendar_error=true},
            ()=>this.calendar_error=false
          );
        }else{
          this.calendar_error=true;
        }
    }
    //Fetches the news event block from Polypoly through the home-service class.
    visible:number = 0;
    getNewsFeed(id:string){
      if(id){
        this.homeService.getNewsFeed(id)
        .subscribe(res => {
            for(var i =0;i<res.length-1;i++){
              this.news_block.push(this.sanitizer.bypassSecurityTrustHtml(res[i]));
            }
            setTimeout(()=>{
              if(this.isOverflowed(this.newsBlockElement.nativeElement)){
                this.slideShow(this.news_block);
              };
              this.visible = 1;
            },100);
          },
          error => {this.news_feed_error=true},
          ()=>   {this.news_feed_error=false}
        );
      }else{
        this.news_feed_error=true;
      }
    }
    //Calls getCalendar and getNewsFeed on View Init.
    ngOnInit(){
      //Contains screenspecific configuration
      let screenInfo = new ScreenSpecificInformation();
      //Checks if localstorage file exists
      if(localStorage.getItem(Constants.SETUP_PROCESS_KEY)){
        screenInfo =  <ScreenSpecificInformation> JSON.parse(localStorage.getItem(Constants.SETUP_PROCESS_KEY));
        this.getCalendar(screenInfo.calendar_polypoly_id);
        this.getNewsFeed(screenInfo.news_feed_polypoly_id);
      }else{
        //If localstorage file doesnt exists, display error messages!
        this.news_feed_error=true;
        this.calendar_error=true;
      }
    }
    //opacity is used to set the opacity of all the news event elements in the view of this component.
    opacatiy:number=1;
    //Creates a simple slideshow of the articles in the array passed as argument.
    slideShow(articles, tmp=null){
      if(tmp===null){
        let numberOfArticles = articles.length;
        if(numberOfArticles>2){
          tmp = articles.splice(0,numberOfArticles-2);
        }else{
          tmp = articles.splice(0,1);
        }
        return this.slideShow(articles,tmp);
      }
      setTimeout(()=>this.opacatiy=1,1);
      setTimeout(()=>{
        this.opacatiy=0;
        articles.push(tmp[0]);
        tmp.shift();
        tmp.push(articles.splice(0,1)[0]);
        this.slideShow(articles,tmp);
      },10000);
    }
    isOverflowed(element){
      return element.scrollHeight > element.clientHeight;
    }
  }
