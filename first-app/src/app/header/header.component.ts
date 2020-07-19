import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output('headerClick') shoppingListEditor = new EventEmitter<{clickType: string}>();

  constructor() { }

  ngOnInit() {
  }

  onHeaderClick = (clickType: string) => {
    this.shoppingListEditor.emit({clickType: clickType});
  }

}
