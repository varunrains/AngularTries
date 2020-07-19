import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'hello-directive',
  templateUrl: './hello-directive.component.html',
  styleUrls: ['./hello-directive.component.css']
})
export class HelloDirectiveComponent implements OnInit,
                                                OnChanges,
                                                DoCheck,
                                                AfterContentInit,
                                                AfterContentChecked,
                                                AfterViewInit,
                                                AfterViewChecked,
                                                OnDestroy
                                                
{
  @Input('inputElement') element: { name: string, type: string, content: string };
  @Input('inputElemen') siml: string;
  shouldParagraphDisplay: boolean = false;
  counter: number = 0;
  counterArray: Array<any> = [];
  @ViewChild('viewchilddemo', {static:false}) localViewChild: ElementRef;
  @ContentChild('contentchilddemo', { static: false }) localContentChild: ElementRef;

  constructor() {
    console.log('constructor is called!');
  }

  //ngOnInit() {
  //  console.log('ng on init called');
  //  console.log(this.element);
  //}

  //ngOnChanges is the only hook that has parameter
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ng on change called');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ng on init called');
    console.log(this.siml);
    //Try accessing the View child elements here
    //This will be always undefined
    console.log('View child element in ngOnInit() : ' + this.localViewChild);
    console.log('Content child element in ngOnInit() : ' + this.localContentChild);
  }

  //Will run on every change detection cycle
  //In development mode this hook will be called twice, because angular in development mode has one extra change detection cycle
  //This will get called whenever there is any change in the UI, even if there is blank button click, when a promise is returned
  //Dont write complex logic here impact performance
  ngDoCheck() {
    console.log('ng DO check called');
  }

  //Arrow funnctions does not work with hooks
  //THis will be only called if we use <ng-content> in the component and it will be only called once during initialization
  ngAfterContentInit () :void {
    console.log("NG After content Init called!");
    //@Content can be accessed in AfterContentInit hook as this suggests that the parent component that is sending some template data
    //to the child component which is using the ng-content and to access this we can use @ContentChild method
    console.log('Content child element in ngAfterContentInit() : ' + this.localContentChild.nativeElement.textContent);
  }

  //This hook is similar to ngDocheck hook, called after ngDoCheck
  ngAfterContentChecked(): void {
    console.log("NG After content Checked called!");
    //This will be always undefined
    console.log('View child element in ngAfterContentChecked() : ' + this.localViewChild);
  }


  ngAfterViewInit(): void {
    console.log("NG After VIEW INIT! called!");
    //View child elements can only be accessed after the view is initialized
    console.log('View child element in ngAfterViewInit() : ' + this.localViewChild.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log("NG After VIEW CHECKED! called!");
  }

  //If there is any removal of items in the DOM then this will get called
  ngOnDestroy(): void {
    console.log("NG ON DESTROY CALLED!!");
  }

  public getColor(index: number): string {
    if (index >= 5)
      return "blue";

    return "white";
  };

  public toggleParagraph() {
    this.shouldParagraphDisplay = !this.shouldParagraphDisplay;
    //this.counter++;
    this.counterArray.push(new Date());
  }
}
