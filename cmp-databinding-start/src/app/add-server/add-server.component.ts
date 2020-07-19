import { Component, OnInit } from '@angular/core';
import { Server } from './server.model'
import { ServerType } from './server-type.model'

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  servers:Server [] = [];
  newServerName = '';
  newServerContent = '';

 public onAddServer(serverType) {
   this.servers.push(new Server(serverType, this.newServerName, this.newServerContent));
  }
}
