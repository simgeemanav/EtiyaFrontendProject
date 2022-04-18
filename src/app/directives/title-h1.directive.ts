import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitleH1]'
})
export class TitleH1Directive implements OnInit{

  //dısarıdan parametre alımı
  @Input() appTitleH1 = ''

  constructor( private el:ElementRef ) { }

  ngOnInit(): void {
    console.log(this.el.nativeElement)
    //this.el.nativeElement.style.backgroundColor =  this.appTitleH1
    this.el.nativeElement.outerHTML = '<h1 class="text-2xl underline decoration-3 decoration-amber-500"> '+this.appTitleH1+' </h1>'
  }

}
