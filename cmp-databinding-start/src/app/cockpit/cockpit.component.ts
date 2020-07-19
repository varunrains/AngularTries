import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  //we can use the alias name here also as Input
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') onBluePrintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @ViewChild('serverContent') serverContent: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  //newServerName = '';
  //newServerContent = '';

  onAddServer(serverNameInput: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameInput.value,
      serverContent: this.serverContent.nativeElement.value
    });
  }

  onAddBlueprint(serverNameInput: HTMLInputElement) {
    this.onBluePrintCreated.emit({
      serverName: serverNameInput.value,
      serverContent: this.serverContent.nativeElement.value
    });
  }
}
