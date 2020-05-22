export default class Authorized {
  private Store: any;
  public constructor(Store: any) {
    this.Store = Store;
  }

  public validate() {
    if (true) {
      return { isValid: true };
    } else {
      return { isValid: false, redirectPath: "/" };
    }
  }
}
