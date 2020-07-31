import { Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { ServersService } from "../servers.service";
import { Observable } from "rxjs/Observable";

interface Server {
  id: number;
  name; string;
  status:string;
}

@Injectable({providedIn:'root'})
export class ServerResolverService implements Resolve<Server> {
  constructor(private serversService: ServersService) { }

  //This is executed every time and no observable (subscription) is
  //not required here
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Server> |
    Promise<Server> |
    Server {
   return <Server>this.serversService.getServer(+route.params['id']);
  }
}
