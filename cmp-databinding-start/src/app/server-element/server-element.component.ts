import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})

//ViewEncapsulation.Emulated --> Is by default :   CSS applied to this component will only be applied to the respective component
//ViewEncapsulation.None --> CSS will be applied globally. Because for each rendered element there is no attribute attached like in ViewEncapsulation.Emulated or None
//ViewEncapsulation.Native -->  Will use shadow DOM technology CSS applied here will be applied to specific component like Emulated. Native is browser specific. 
export class ServerElementComponent implements OnInit {
 @Input('srvElement') element: {type: string , name: string, content:string}
  constructor() { }

  ngOnInit(): void {
  }

}
