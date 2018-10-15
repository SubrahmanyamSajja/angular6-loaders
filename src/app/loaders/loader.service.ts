import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  private counter: any = {};
  private isFirst: boolean = true;
  private lastLoaderId: string[] = [];
  private defaultDirection: string = 'both';
  private style: string = `.loader-container{display:none;overflow:hidden;position:absolute;left:0;top:-8px;width:100%} .loader-container.active { display: block;} .loader{-webkit-animation:auxiliary-indeterminate-translate 2s infinite linear;animation:auxiliary-indeterminate-translate 2s infinite linear;visibility:visible;height:auto}.display{background-color:#ff9800;display:inline-block;-webkit-animation:auxiliary-indeterminate-scale 2s infinite linear;animation:auxiliary-indeterminate-scale 2s infinite linear;height:5px;width:75%;}@keyframes auxiliary-indeterminate-scale{0%{-webkit-animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);-webkit-transform:scaleX(.08);transform:scaleX(.08)}19.15%{-webkit-animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);-webkit-transform:scaleX(.457104);transform:scaleX(.457104)}44.15%{-webkit-animation-timing-function:cubic-bezier(.257759,.003163,.211762,1.38179);animation-timing-function:cubic-bezier(.257759,.003163,.211762,1.38179);-webkit-transform:scaleX(.72796);transform:scaleX(.72796)}to{-webkit-transform:scaleX(.08);transform:scaleX(.08)}}@-webkit-keyframes auxiliary-indeterminate-scale{0%{-webkit-animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);animation-timing-function:cubic-bezier(.205028,.057051,.57661,.453971);-webkit-transform:scaleX(.08);transform:scaleX(.08)}19.15%{-webkit-animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);animation-timing-function:cubic-bezier(.152313,.196432,.648374,1.004315);-webkit-transform:scaleX(.457104);transform:scaleX(.457104)}44.15%{-webkit-animation-timing-function:cubic-bezier(.257759,.003163,.211762,1.38179);animation-timing-function:cubic-bezier(.257759,.003163,.211762,1.38179);-webkit-transform:scaleX(.72796);transform:scaleX(.72796)}to{-webkit-transform:scaleX(.08);transform:scaleX(.08)}}@keyframes auxiliary-indeterminate-translate{0%{-webkit-animation-timing-function:cubic-bezier(.15,0,.515058,.409685);animation-timing-function:cubic-bezier(.15,0,.515058,.409685);-webkit-transform:translateX(-54.888891%);transform:translateX(-54.888891%)}25%{-webkit-animation-timing-function:cubic-bezier(.310330,.284058,.8,.733712);animation-timing-function:cubic-bezier(.310330,.284058,.8,.733712);-webkit-transform:translateX(-17.236978%);transform:translateX(-17.236978%)}48.35%{-webkit-animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);-webkit-transform:translateX(29.497274%);transform:translateX(29.497274%)}to{-webkit-transform:translateX(105.388891%);transform:translateX(105.388891%)}}@-webkit-keyframes auxiliary-indeterminate-translate{0%{-webkit-animation-timing-function:cubic-bezier(.15,0,.515058,.409685);animation-timing-function:cubic-bezier(.15,0,.515058,.409685);-webkit-transform:translateX(-54.888891%);transform:translateX(-54.888891%)}25%{-webkit-animation-timing-function:cubic-bezier(.310330,.284058,.8,.733712);animation-timing-function:cubic-bezier(.310330,.284058,.8,.733712);-webkit-transform:translateX(-17.236978%);transform:translateX(-17.236978%)}48.35%{-webkit-animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);animation-timing-function:cubic-bezier(.4,.627035,.6,.902026);-webkit-transform:translateX(29.497274%);transform:translateX(29.497274%)}to{-webkit-transform:translateX(105.388891%);transform:translateX(105.388891%)}}.preloaderbar{z-index:1;position:absolute;top:0;left:0;right:0;height:4px;margin-bottom:-4px}.preloaderbar .bar{position:absolute;width:100%;height:0;text-indent:-9999px;background-color:#23b7e5;z-index:10000000000000000000000;left:0}.preloaderbar .bar:before{position:absolute;right:50%;left:50%;height:4px;background-color:inherit;content:""}.preloaderbar.active{-webkit-animation:changebar 2.25s infinite .75s;-moz-animation:changebar 2.25s infinite .75s;animation:changebar 2.25s infinite .75s}.preloaderbar.active .bar{-webkit-animation:changebar 2.25s infinite;-moz-animation:changebar 2.25s infinite;animation:changebar 2.25s infinite}.preloaderbar.active .bar:before{-webkit-animation:movingbar .75s infinite;-moz-animation:movingbar .75s infinite;animation:movingbar .75s infinite}@-webkit-keyframes movingbar{0%{right:50%;left:50%}99.9%{right:0;left:0}100%{right:50%;left:50%}}@-moz-keyframes movingbar{0%{right:50%;left:50%}99.9%{right:0;left:0}100%{right:50%;left:50%}}@keyframes movingbar{0%{right:50%;left:50%}99.9%{right:0;left:0}100%{right:50%;left:50%}}@-webkit-keyframes changebar{0%,33.3%{background-color:#8BC34A}33.33%,66.6%{background-color:#FFCA28}66.66%,99.9%{background-color:#F44336}}@-moz-keyframes changebar{0%,33.3%{background-color:#8BC34A}33.33%,66.6%{background-color:#FFCA28}66.66%,99.9%{background-color:#F44336}}@keyframes changebar{0%,33.3%{background-color:#8BC34A}33.33%,66.6%{background-color:#FFCA28}66.66%,99.9%{background-color:#F44336}}.fix{position:fixed}.rel{position:relative}`;

  constructor() {
    if (this.isFirst) {
      let head = document.querySelector('head');
      let style = document.createElement('style');
      style.innerHTML = this.style;
      head.appendChild(style);
      this.isFirst = false;
    }

  }
  setDirection(direction) {
    this.defaultDirection = direction;
  }

  show(selector: string = 'body', direction: string = this.defaultDirection) {
    let id = selector.replace(/[^a-z0-9]/gmi, "") + '_' + direction + 'loader';
    let div = document.querySelector('#' + id);
    if (div == null) {
      this.counter[id] = 0;
      div = this.getLoader(direction);
      if (selector == 'body') {
        div.classList.add('fix');
      }
      div.setAttribute('id', id);
      document.querySelector(selector).appendChild(div);
    }
    if (selector != 'body') {
      div.parentElement.classList.add('rel')
    }
    this.counter[id] += 1;
    div.classList.add('active');
    this.lastLoaderId.push(id);
    return id;
  }

  hide(id?: string) {
    if (id) {
        let ind=this.lastLoaderId.indexOf(id);
        this._hide(id);
        this.lastLoaderId.splice(ind,1);
    } else {
      id = id || this.lastLoaderId[this.lastLoaderId.length - 1] || '';
      if (id) {
        this._hide(id);
        this.lastLoaderId.pop();
      }
    }
  }

  private _hide(id:string){
    this.counter[id] -= ((this.counter[id] > 0) ? 1 : 0);
    if (this.counter[id] == 0) {
      document.querySelector('#' + id).classList.remove('active');
    }
  }

  hideAll() {
    document.querySelectorAll('.su_loaders').forEach((ele) => { ele.classList.remove('active') });
    Object.keys(this.counter).forEach(key => { this.counter[key] = 0 });
  }

  private getLoader(direction: string) {
    let div = document.createElement('div');
    div.classList.add("su_loaders");
    if (direction == 'both') {
      div.classList.add("preloaderbar");
      div.innerHTML = '<span class="bar"></span>';
    } else {
      div.classList.add("loader-container");
      div.innerHTML = '<div class="loader"><span class="display"></span></div>';
    }
    return div;
  }
}


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  loaderId: string = '';
  constructor(private loader: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderId = this.loader.show('body');
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.loader.hide(this.loaderId);
          }
        }, error => {
          this.loader.hide(this.loaderId);
        })
      )

  };
}

export let LoaderProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoaderInterceptor,
  multi: true
};