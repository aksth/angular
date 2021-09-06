import { Directive, ElementRef, OnInit, Input } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit{

    @Input('appBasicHighlight') highlightColor: string = 'transparent';

    constructor(private elementRef: ElementRef){
    }

    ngOnInit(){
        this.elementRef.nativeElement.style.backgroundColor = this.highlightColor;
    }

}