//TODO: Mapped the naming convention as similar to the Server side DTO. Check to see if can remove the below warnings in Naming conventions
export class User {
  constructor(
    public DisplayName: string,
    public UserName: string,
    public SecretKey:string,
    public UserAmount: number,
    public UserRole: number,
    public UserGroup?: string,
    public IsAdmin?: boolean,
    public UsersFutureBets?:number[]) {
  }

  
  }
