import { User } from "../models/user.model";
import { environment } from '../../environments/environment';

export class EntityHelper {
  //static serviceUrl: string = 'https://localhost:44327/';
  static serviceUrl: string = environment.production ? 'https://iplbet.azurewebsites.net/' : 'https://localhost:44327/';
 // static serviceUrl: string = 'https://iplbet.azurewebsites.net/';
  static Dynamic_Caching: string = 'DYNAMIC_CACHING';
  static LocalStorageToken: string = 'tokenData';
  static LocalStorageUser: string = 'userData';
  static DateFormat: string = 'dd-MMM hh:mm a';

  static  getUserDetails = (): User => {
    return <User>JSON.parse(localStorage.getItem(EntityHelper.LocalStorageUser));
  }

}


