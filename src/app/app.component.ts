import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loaders/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'appOne';

  constructor(private http:HttpClient,private loaderService:LoaderService){

  }

  ngOnInit(){
    setTimeout(()=>{
      this.getDate()
    },2000);
  }

  getDate(){
    this.http.get('http://localhost:3000/users').subscribe(res=>{console.log(res)});
  }

  showLoader(selectiod,style){
    this.loaderService.show(selectiod,style);
  }

  hideLoader (){
    this.loaderService.hide();
  }
}
