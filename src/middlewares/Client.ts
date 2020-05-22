import * as Store from "../actions/Store";
import * as Models from "../models";

export default class Client {
  /**
   * Получение всех авто?
   *
   * @return function(Dispatch)->Car
   */
  public static load(data: any) {
    return (Dispatch: any) => {
      new Models.Client()
        .load(data)
        .then((data: any) => {
          Dispatch(Store.Client.setData(data.data));
        })
        .catch((Exception: any) => {});
    };
  }
}
