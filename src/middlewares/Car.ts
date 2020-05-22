import * as Store from "../actions/Store";
import * as Models from "../models";

export default class Car {
  /**
   * Получение всех брендов
   *
   * @return function(Dispatch)->Car
   */
  public static getBrands(data: any) {
    return (Dispatch: any) => {
      Dispatch(Store.Car.setLoadingStatus(true));
      new Models.Car()
        .getBrands(data)
        .then((data: any) => {
          Dispatch(Store.Car.setLoadingStatus(false));
          Dispatch(Store.Car.setBrands(data));
        })
        .catch((Exception: any) => {
          Dispatch(Store.Car.setLoadingStatus(false));
          Dispatch(Store.Car.setError(Exception));
        });
    };
  }
  /**
   * Получение всех моделей
   *
   * @return function(Dispatch)->Car
   */
  public static getModels(data: any) {
    return (Dispatch: any) => {
      Dispatch(Store.Car.setLoadingStatus(true));

      new Models.Car()
        .getModels(data)
        .then((data: any) => {
          Dispatch(Store.Car.setLoadingStatus(false));
          Dispatch(Store.Car.setModels(data));
        })
        .catch((Exception: any) => {
          Dispatch(Store.Car.setLoadingStatus(false));
          Dispatch(Store.Car.setError(Exception));
        });
    };
  }
  /**
   * Получение всех генераций
   *
   * @return function(Dispatch)->Car
   */
  public static getGenerations(data: any) {
    return (Dispatch: any) => {
      Dispatch(Store.Car.setLoadingStatus(true));
      new Models.Car()
        .getGenerations(data)
        .then((data: any) => {
          Dispatch(Store.Car.setLoadingStatus(false));
          Dispatch(Store.Car.setGenerations(data));
        })
        .catch((Exception: any) => {
          Dispatch(Store.Car.setLoadingStatus(false));
          Dispatch(Store.Car.setError(Exception));
        });
    };
  }
  /**
   * Установка новой машины
   *
   * @return function(Dispatch)->Car
   */
  public static addCar(data: any) {
    return async (Dispatch: any) => {
      Dispatch(Store.Car.addCar(data));
    };
  }
}
