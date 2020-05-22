export default class Client {
  public static readonly SET_LOADING_STATUS = "CLIENT_SET_LOADING_STATUS";
  public static readonly SET_ERROR = "CLIENT_SET_ERROR";
  public static readonly SET_DATA = "CLIENT_SET_DATA";
  public static readonly CLEAR = "CLIENT_CLEAR";

  public static setLoadingStatus(data: any) {
    return {
      data,
      type: Client.SET_LOADING_STATUS,
    };
  }
  public static setError(data: any) {
    return {
      data,
      type: Client.SET_ERROR,
    };
  }
  public static setData(data: any) {
    return {
      data,
      type: Client.SET_DATA,
    };
  }
  public static Clear(data: any) {
    return {
      data,
      type: Client.CLEAR,
    };
  }
}
