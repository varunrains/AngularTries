import { User } from "../models/user.model";
import { environment } from '../../environments/environment';

export class EntityHelper {
  //static serviceUrl: string = 'https://localhost:44327/';
  //static serviceUrl: string = environment.production ? 'https://iplbet.azurewebsites.net/' : 'https://localhost:44327/';
  static serviceUrl: string = 'https://iplt2021.azurewebsites.net/';
  static Dynamic_Caching: string = 'DYNAMIC_CACHING';
  static UI_Url: string = "https://dfs.z13.web.core.windows.net/";
  static LocalStorageToken: string = 'tokenData';
  static LocalStorageUser: string = 'userData';
  static DateFormat: string = 'dd-MMM hh:mm a';
  static VAPID_PUBLIC_KEY = 'BDk-QSoBtl9BNgY5mGVzP9iiUtAdQFPsnUl3VwnZz05zO54OsS_d8yiBxrdubhd236AWcx0E2E0JFfVo1t-sc0E';

  static  getUserDetails = (): User => {
    return <User>JSON.parse(localStorage.getItem(EntityHelper.LocalStorageUser));
  }

}


