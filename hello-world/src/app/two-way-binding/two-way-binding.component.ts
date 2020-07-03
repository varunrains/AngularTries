import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'two-way-binding',
  templateUrl: './two-way-binding.component.html',
  styleUrls: ['./two-way-binding.component.css']
})
export class TwoWayBindingComponent implements OnInit {
  inputTextBoxModel = "";
  inputArray = ['toshow','sdf'];
  constructor() { }

  ngOnInit() {
  }

  onButtonClick = (a, b, c) => {
    console.log(a);
    this.inputArray.push(this.inputTextBoxModel);
    this.inputTextBoxModel = "";
  }

}
