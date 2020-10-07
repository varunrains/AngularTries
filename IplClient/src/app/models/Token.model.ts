export class Token {
  constructor(public userToken: string, public tokenExpirationDate: Date) { }
  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.userToken;
  }
}
