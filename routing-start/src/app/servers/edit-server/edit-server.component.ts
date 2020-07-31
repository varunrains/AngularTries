import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { ServersService } from '../servers.service';
import {CanDeactivateGuard, CanComponentDeactivate} from '../../can-deactivate-guard.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate  {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    //This data will not change once the component is loaded
    //You will not see the updated queryparams/fragment
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    //To get the updated details you need to subscribe these
    //You no need to unsubscribe as Angular will take care of unsubscribing here
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1';
    });
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.serversService.getServer(+params['id']) ;
    });

    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }

}
